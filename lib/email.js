// Using Maileroo
export async function sendOrderConfirmationEmail(customerEmail, orderDetails, invoiceUrl = '#') {
  try {
    const formData = new FormData();
    const apiKey = process.env.MAILEROO_API_KEY;

    // Add template email details
    formData.append('from', 'BelovedMoment <orders@belovedmoment.com>'); // Verified sender
    formData.append('to', customerEmail);
    formData.append('subject', 'Order Confirmation - Your Photo is Being Transformed!');
    formData.append('template_id', '5073');

    // Prepare template data to match Maileroo template variables
    const templateData = {
      'name': customerEmail, // Using email as name since no name is collected
      'Order Number': orderDetails.id,
      'Order Date': new Date(orderDetails.created_at).toLocaleDateString('en-GB'),
      'Amount': (orderDetails.total_in_cents / 100).toFixed(2),
      'Invoice': invoiceUrl // Link to Stripe invoice
    };

    formData.append('template_data', JSON.stringify(templateData));

    const response = await fetch('https://smtp.maileroo.com/send-template', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Email sending failed');
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
}

export async function sendAdminNotificationEmail(orderDetails) {
  try {
    const formData = new FormData();
    const apiKey = process.env.MAILEROO_API_KEY;

    // Calculate delivery ETA
    const createdDate = new Date(orderDetails.created_at);
    const processingHours = orderDetails.processing_time === '15h' ? 24 : 36;
    const deliveryDate = new Date(createdDate.getTime() + processingHours * 60 * 60 * 1000);

    // Format dates
    const formattedCreated = createdDate.toLocaleString('en-GB', {
      timeZone: 'UTC',
      dateStyle: 'medium',
      timeStyle: 'short'
    });
    const formattedDelivery = deliveryDate.toLocaleString('en-GB', {
      timeZone: 'UTC',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    formData.append('from', 'BelovedMoment <orders@belovedmoment.com>');
    formData.append('to', 'Support@belovedmoment.com');
    formData.append('subject', `New Order Received - #${orderDetails.id}`);
    formData.append('html', `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
        <h2 style="color: #4f46e5;">New Order Received</h2>
        <p>A new purchase has been completed successfully.</p>
        
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Order ID:</strong> ${orderDetails.id}</p>
          <p style="margin: 5px 0;"><strong>Created At:</strong> ${formattedCreated} UTC</p>
          <p style="margin: 5px 0;"><strong>Customer Email:</strong> ${orderDetails.email}</p>
          <p style="margin: 5px 0;"><strong>Total Paid:</strong> £${(orderDetails.total_in_cents / 100).toFixed(2)}</p>
          <p style="margin: 5px 0;"><strong>Processing Time:</strong> ${orderDetails.processing_time} (${processingHours}h)</p>
          <p style="margin: 5px 0; color: #d97706;"><strong>Estimated Delivery:</strong> ${formattedDelivery} UTC</p>
        </div>
        
        <p style="font-size: 12px; color: #6b7280;">This is an automated notification from the BelovedMoment system.</p>
      </div>
    `);

    const response = await fetch('https://smtp.maileroo.com/send', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Admin email sending failed');
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Admin email sending failed:', error);
    return { success: false, error: error.message };
  }
}







export async function contactEmail(emailData) {
  try {


    const formData = new FormData();
    const apiKey = process.env.MAILEROO_API_KEY;

    formData.append('from', 'BelovedMoment <contact@belovedmoment.com>');
    formData.append('to', 'Support@belovedmoment.com');
    formData.append('subject', `New Contact Form Submission}`);
    formData.append('html', `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
        <h2 style="color: #4f46e5;">New Order Received</h2>
        <p>A new purchase has been completed successfully.</p>
        
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Sender Email:</strong> ${emailData.email}</p>
          <p style="margin: 5px 0;"><strong>Message:</strong> ${emailData.message} UTC</p>
        </div>
        
        <p style="font-size: 12px; color: #6b7280;">This is an automated notification from the BelovedMoment system.</p>
      </div>
    `);

    const response = await fetch('https://smtp.maileroo.com/send', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Contact Page email sending failed');
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Admin email sending failed:', error);
    return { success: false, error: error.message };
  }
}