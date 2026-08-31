'use server';

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

interface EmailData {
  to: string;
  subject: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
  type: 'contact' | 'purchase' | 'custom_product';
  orderData?: any;
  language?: string;
}

export async function sendEmail(data: EmailData) {
  try {
    const { to, subject, name, company, email, phone, message, type, orderData, language } = data;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const isEnglish = language === 'en';

    // ==========================================
    // TIPO 1: FORMULARIO DE CONTACTO
    // ==========================================
    if (type === 'contact') {
      // Email de contacto
      const contactHTML = `
        <div style="font-family:'Bentham','Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#1E2A47,#2D3B5E);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;font-family:'Unna',serif;">${isEnglish ? 'New Contact Message' : 'Nuevo mensaje de contacto'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p style="font-size:16px;"><strong>${isEnglish ? 'Name:' : 'Nombre:'}</strong> ${name}</p>
            <p><strong>${isEnglish ? 'Company:' : 'Compañía:'}</strong> ${company || 'N/A'}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>${isEnglish ? 'Phone:' : 'Teléfono:'}</strong> ${phone || 'N/A'}</p>
            <p><strong>${isEnglish ? 'Message:' : 'Mensaje:'}</strong></p>
            <p style="background:#f1f5f9;padding:15px;border-radius:8px;">${message}</p>
          </div>
        </div>`;

      // Forward al admin
      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'administracion@lumetra.mx',
          to: adminEmail,
          subject: isEnglish ? '[FWD] New Contact Message - LUMETRA' : '[FWD] Nuevo mensaje de contacto - LUMETRA',
          html: contactHTML,
        });
      }

      // Confirmación al cliente
      const clientHTML = `
        <div style="font-family:'Bentham','Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#1E2A47,#2D3B5E);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;font-family:'Unna',serif;">${isEnglish ? 'Message Received' : 'Mensaje recibido'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p>${isEnglish ? `Hello <strong>${name}</strong>,` : `Hola <strong>${name}</strong>,`}</p>
            <p>${isEnglish ? 'We have received your message and will contact you soon.' : 'Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.'}</p>
            <p style="color:#6B7280;">LUMETRA - administracion@lumetra.mx</p>
          </div>
        </div>`;

      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'administracion@lumetra.mx',
        to: to,
        subject: isEnglish ? 'Message Received - LUMETRA' : 'Mensaje recibido - LUMETRA',
        html: clientHTML,
      });

      return { success: true };
    }

    // ==========================================
    // TIPO 2: COMPRA EXITOSA
    // ==========================================
    if (type === 'purchase' && orderData) {
      const productosHTML = orderData.productos
        .map((p: any) => `<tr><td style="padding:8px;border-bottom:1px solid rgba(30,42,71,0.2);color:#1F2937;">${p.nombre} × ${p.cantidad}</td><td style="padding:8px;border-bottom:1px solid rgba(30,42,71,0.2);text-align:right;color:#1E2A47;">$${p.precio.toFixed(2)}</td></tr>`)
        .join('');

      const emailHTML = `
        <div style="font-family:'Bentham','Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#1E2A47,#2D3B5E);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;font-family:'Unna',serif;">${isEnglish ? 'Purchase Confirmed!' : '¡Compra confirmada!'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p style="font-size:16px;">${isEnglish ? `Hello <strong style="color:#1E2A47;">${orderData.nombre}</strong>,` : `Hola <strong style="color:#1E2A47;">${orderData.nombre}</strong>,`}</p>
            <p>${isEnglish ? 'Your order has been processed successfully.' : 'Tu pedido ha sido procesado correctamente.'}</p>
            <h2 style="color:#1F2937;font-size:18px;border-bottom:2px solid #1E2A47;padding-bottom:8px;font-family:'Unna',serif;">${isEnglish ? 'Order Summary' : 'Resumen de tu pedido'}</h2>
            <table style="width:100%;border-collapse:collapse;">${productosHTML}</table>
            <div style="margin-top:20px;padding:20px;background:#EDE9FE;border-radius:8px;border:1px solid rgba(30,42,71,0.2);">
              <p><strong>${isEnglish ? 'Subtotal:' : 'Subtotal:'}</strong> <span style="color:#1E2A47;">$${orderData.subtotal.toFixed(2)}</span></p>
              <p><strong>${isEnglish ? 'VAT (16%):' : 'IVA (16%):'}</strong> <span style="color:#1E2A47;">$${orderData.impuesto.toFixed(2)}</span></p>
              <p style="font-size:18px;"><strong>${isEnglish ? 'Total:' : 'Total:'}</strong> <span style="color:#1E2A47;">$${orderData.total.toFixed(2)} <span style="font-size:14px;">MXN</span></span></p>
            </div>
            <p style="color:#6B7280;"><strong>${isEnglish ? 'Transaction:' : 'Transacción:'}</strong> ${orderData.transactionId}</p>
            <p>${isEnglish ? 'Thank you for your purchase at' : 'Gracias por tu compra en'} <strong style="color:#1E2A47;">LUMETRA</strong>.</p>
          </div>
          <div style="background:#EDE9FE;padding:20px;text-align:center;border-top:1px solid rgba(30,42,71,0.1);">
            <p style="color:#6B7280;font-size:12px;margin:0;">LUMETRA - administracion@lumetra.mx</p>
          </div>
        </div>`;

      // Email al cliente
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'administracion@lumetra.mx',
        to: to,
        subject: isEnglish ? 'Purchase Confirmed! - LUMETRA' : '¡Compra confirmada! - LUMETRA',
        html: emailHTML,
      });

      // Forward al admin
      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'administracion@lumetra.mx',
          to: adminEmail,
          subject: isEnglish ? `[FWD] New Purchase - ${orderData.nombre}` : `[FWD] Nueva compra - ${orderData.nombre}`,
          html: `<div style="font-family:'Bentham','Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:12px;overflow:hidden;"><div style="background:#1E2A47;padding:20px;"><h2 style="color:#f8fafc;margin:0;font-family:'Unna',serif;">${isEnglish ? 'New Purchase' : 'Nueva compra'}</h2></div><div style="padding:20px;"><p><strong>${isEnglish ? 'Customer:' : 'Cliente:'}</strong> ${orderData.nombre}</p><p><strong>Total:</strong> <span style="color:#1E2A47;">$${orderData.total.toFixed(2)} MXN</span></p></div>${emailHTML}</div>`,
        });
      }

      return { success: true };
    }

    // ==========================================
    // TIPO 3: SERVICIO PERSONALIZADO AGREGADO AL CARRITO
    // ==========================================
    if (type === 'custom_product' && orderData) {
      const { nombre, email, folio, descripcion, costo, cantidad } = orderData;

      // Email de aviso al admin
      const adminHTML = `
        <div style="font-family:'Bentham','Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#1E2A47,#2D3B5E);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;font-family:'Unna',serif;">${isEnglish ? 'New Custom Service Added to Cart' : 'Nuevo servicio personalizado agregado al carrito'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p style="font-size:16px;"><strong>${isEnglish ? 'Customer Name:' : 'Nombre del cliente:'}</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>${isEnglish ? 'Folio Number:' : 'Número de folio:'}</strong> ${folio}</p>
            <p><strong>${isEnglish ? 'Service Description:' : 'Descripción del servicio:'}</strong></p>
            <p style="background:#f1f5f9;padding:15px;border-radius:8px;">${descripcion}</p>
            <p><strong>${isEnglish ? 'Service Cost:' : 'Costo del servicio:'}</strong> <span style="color:#1E2A47;">$${costo.toFixed(2)} MXN</span></p>
            <p><strong>${isEnglish ? 'Quantity:' : 'Cantidad:'}</strong> ${cantidad}</p>
            <p><strong>${isEnglish ? 'Total:' : 'Total:'}</strong> <span style="color:#1E2A47;">$${(costo * cantidad).toFixed(2)} MXN</span></p>
          </div>
        </div>`;

      // Forward al admin
      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'administracion@lumetra.mx',
          to: adminEmail,
          subject: isEnglish ? `[FWD] New Custom Service - ${nombre}` : `[FWD] Nuevo servicio personalizado - ${nombre}`,
          html: adminHTML,
        });
      }

      // Confirmación al cliente
      const clientHTML = `
        <div style="font-family:'Bentham','Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#1E2A47,#2D3B5E);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;font-family:'Unna',serif;">${isEnglish ? 'Custom Service Added to Cart' : 'Servicio personalizado agregado al carrito'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p>${isEnglish ? `Hello <strong>${nombre}</strong>,` : `Hola <strong>${nombre}</strong>,`}</p>
            <p>${isEnglish ? 'Your custom service has been successfully added to your cart.' : 'Tu servicio personalizado ha sido agregado exitosamente a tu carrito.'}</p>
            <div style="margin-top:20px;padding:20px;background:#EDE9FE;border-radius:8px;border:1px solid rgba(30,42,71,0.2);">
              <p><strong>${isEnglish ? 'Folio:' : 'Folio:'}</strong> ${folio}</p>
              <p><strong>${isEnglish ? 'Service:' : 'Servicio:'}</strong> ${descripcion}</p>
              <p><strong>${isEnglish ? 'Cost:' : 'Costo:'}</strong> <span style="color:#1E2A47;">$${costo.toFixed(2)} MXN</span></p>
              <p><strong>${isEnglish ? 'Quantity:' : 'Cantidad:'}</strong> ${cantidad}</p>
              <p><strong>${isEnglish ? 'Total:' : 'Total:'}</strong> <span style="color:#1E2A47;">$${(costo * cantidad).toFixed(2)} MXN</span></p>
            </div>
            <p style="margin-top:20px;">${isEnglish ? 'You can proceed to checkout when ready.' : 'Puedes proceder al pago cuando estés listo.'}</p>
            <p style="color:#6B7280;">LUMETRA - administracion@lumetra.mx</p>
          </div>
        </div>`;

      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'administracion@lumetra.mx',
        to: to,
        subject: isEnglish ? 'Custom Service Added - LUMETRA' : 'Servicio personalizado agregado - LUMETRA',
        html: clientHTML,
      });

      return { success: true };
    }

    return { success: true };
  } catch (error) {
    console.error('Email Error:', error);
    return { success: false, error: 'Error sending email' };
  }
}