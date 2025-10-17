import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

class PDFService {
  /**
   * Generate manufacturing sheet PDF from design data
   */
  async generateManufacturingSheet(orderData: any): Promise<string> {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();

      // Generate HTML for manufacturing sheet
      const html = this.createManufacturingSheetHTML(orderData);

      await page.setContent(html, { waitUntil: 'networkidle0' });

      // Create output directory if it doesn't exist
      const outputDir = path.join(process.cwd(), 'outputs', 'manufacturing-sheets');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const filename = `manufacturing-sheet-${orderData.orderId}-${Date.now()}.pdf`;
      const filepath = path.join(outputDir, filename);

      await page.pdf({
        path: filepath,
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm',
        },
      });

      await browser.close();

      return filepath;
    } catch (error) {
      console.error('PDF generation error:', error);
      throw new Error('Failed to generate manufacturing sheet');
    }
  }

  /**
   * Create HTML template for manufacturing sheet
   */
  private createManufacturingSheetHTML(orderData: any): string {
    const {
      orderId,
      design,
      measurements,
      quantity,
      customer,
      customization,
    } = orderData;

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Manufacturing Sheet - ${orderId}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Arial', sans-serif;
      padding: 20px;
      background: white;
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #000;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .order-id {
      font-size: 18px;
      color: #666;
      font-weight: bold;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 20px;
      font-weight: bold;
      border-bottom: 2px solid #333;
      padding-bottom: 5px;
      margin-bottom: 15px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    .info-item {
      padding: 10px;
      background: #f5f5f5;
      border-radius: 4px;
    }
    .info-label {
      font-weight: bold;
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
    }
    .info-value {
      font-size: 16px;
      margin-top: 5px;
    }
    .measurements-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    .measurements-table th,
    .measurements-table td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    .measurements-table th {
      background-color: #333;
      color: white;
      font-weight: bold;
    }
    .print-details {
      background: #f9f9f9;
      padding: 15px;
      border-left: 4px solid #000;
      margin-top: 10px;
    }
    .notes {
      background: #fff3cd;
      border: 1px solid #ffc107;
      padding: 15px;
      border-radius: 4px;
      margin-top: 15px;
    }
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid #333;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
    .qr-code {
      text-align: center;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🚍 HOODIESBUS</h1>
    <div class="order-id">Manufacturing Sheet - Order #${orderId}</div>
    <div style="margin-top: 10px; font-size: 14px;">Generated: ${new Date().toLocaleDateString()}</div>
  </div>

  <div class="section">
    <div class="section-title">Order Information</div>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Order ID</div>
        <div class="info-value">${orderId}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Quantity</div>
        <div class="info-value">${quantity} pieces</div>
      </div>
      <div class="info-item">
        <div class="info-label">Hoodie Type</div>
        <div class="info-value">${design.hoodieType}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Base Color</div>
        <div class="info-value">${design.baseColor}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Fabric</div>
        <div class="info-value">${design.fabric}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Customer</div>
        <div class="info-value">${customer.name}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Measurements (in cm)</div>
    <table class="measurements-table">
      <thead>
        <tr>
          <th>Measurement</th>
          <th>Value</th>
          <th>Tolerance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Chest Width</td>
          <td>${measurements.chest} cm</td>
          <td>± 1 cm</td>
        </tr>
        <tr>
          <td>Total Length</td>
          <td>${measurements.length} cm</td>
          <td>± 1 cm</td>
        </tr>
        <tr>
          <td>Sleeve Length</td>
          <td>${measurements.sleeve} cm</td>
          <td>± 0.5 cm</td>
        </tr>
        <tr>
          <td>Shoulder Width</td>
          <td>${measurements.shoulder} cm</td>
          <td>± 1 cm</td>
        </tr>
        <tr>
          <td>Waist Width</td>
          <td>${measurements.waist} cm</td>
          <td>± 1 cm</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <div class="section-title">Customization Details</div>

    ${customization.frontPrint ? `
    <div class="print-details">
      <strong>Front Print:</strong><br>
      Type: ${customization.frontPrint.type}<br>
      Content: ${customization.frontPrint.content}<br>
      Position: X:${customization.frontPrint.position.x}, Y:${customization.frontPrint.position.y}<br>
      Scale: ${customization.frontPrint.scale.x} x ${customization.frontPrint.scale.y}
    </div>
    ` : ''}

    ${customization.backPrint ? `
    <div class="print-details">
      <strong>Back Print:</strong><br>
      Type: ${customization.backPrint.type}<br>
      Content: ${customization.backPrint.content}<br>
      Position: X:${customization.backPrint.position.x}, Y:${customization.backPrint.position.y}<br>
      Scale: ${customization.backPrint.scale.x} x ${customization.backPrint.scale.y}
    </div>
    ` : ''}

    ${customization.sleevePrint ? `
    <div class="print-details">
      <strong>Sleeve Print:</strong><br>
      Type: ${customization.sleevePrint.type}<br>
      Content: ${customization.sleevePrint.content}<br>
      Position: X:${customization.sleevePrint.position.x}, Y:${customization.sleevePrint.position.y}<br>
      Scale: ${customization.sleevePrint.scale.x} x ${customization.sleevePrint.scale.y}
    </div>
    ` : ''}
  </div>

  <div class="notes">
    <strong>⚠️ Important Notes:</strong><br>
    • All measurements must be followed precisely within tolerance ranges<br>
    • Check fabric color match before cutting<br>
    • Quality control inspection required before packaging<br>
    • Contact support for any clarifications: support@hoodiesbus.com
  </div>

  <div class="footer">
    <div>Generated by HoodiesBus Platform</div>
    <div>www.hoodiesbus.com | support@hoodiesbus.com</div>
    <div style="margin-top: 10px;">This is a computer-generated document and does not require a signature.</div>
  </div>
</body>
</html>
    `;
  }

  /**
   * Generate order receipt PDF
   */
  async generateReceipt(orderData: any): Promise<string> {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();
      const html = this.createReceiptHTML(orderData);

      await page.setContent(html, { waitUntil: 'networkidle0' });

      const outputDir = path.join(process.cwd(), 'outputs', 'receipts');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const filename = `receipt-${orderData.orderId}-${Date.now()}.pdf`;
      const filepath = path.join(outputDir, filename);

      await page.pdf({
        path: filepath,
        format: 'A5',
        printBackground: true,
      });

      await browser.close();

      return filepath;
    } catch (error) {
      console.error('Receipt generation error:', error);
      throw new Error('Failed to generate receipt');
    }
  }

  /**
   * Create HTML template for receipt
   */
  private createReceiptHTML(orderData: any): string {
    const { orderId, customer, pricing, paymentMethod, createdAt } = orderData;

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Receipt - ${orderId}</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      padding: 30px;
      background: white;
    }
    .receipt-header {
      text-align: center;
      margin-bottom: 30px;
    }
    .receipt-header h1 {
      font-size: 28px;
      margin-bottom: 5px;
    }
    .order-info {
      margin: 20px 0;
      padding: 15px;
      background: #f5f5f5;
      border-radius: 8px;
    }
    .pricing-table {
      width: 100%;
      margin: 20px 0;
      border-collapse: collapse;
    }
    .pricing-table td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    .pricing-table .total {
      font-weight: bold;
      font-size: 18px;
      border-top: 2px solid #000;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="receipt-header">
    <h1>🚍 HOODIESBUS</h1>
    <div>Order Receipt</div>
  </div>

  <div class="order-info">
    <strong>Order ID:</strong> ${orderId}<br>
    <strong>Customer:</strong> ${customer.name}<br>
    <strong>Email:</strong> ${customer.email}<br>
    <strong>Date:</strong> ${new Date(createdAt).toLocaleDateString()}<br>
    <strong>Payment Method:</strong> ${paymentMethod}
  </div>

  <table class="pricing-table">
    <tr>
      <td>Base Price</td>
      <td style="text-align: right;">$${pricing.basePrice.toFixed(2)}</td>
    </tr>
    <tr>
      <td>Customization Cost</td>
      <td style="text-align: right;">$${pricing.customizationCost.toFixed(2)}</td>
    </tr>
    <tr>
      <td>Fabric Cost</td>
      <td style="text-align: right;">$${pricing.fabricCost.toFixed(2)}</td>
    </tr>
    <tr>
      <td>Platform Fee</td>
      <td style="text-align: right;">$${pricing.platformFee.toFixed(2)}</td>
    </tr>
    <tr class="total">
      <td>Total</td>
      <td style="text-align: right;">$${pricing.totalPrice.toFixed(2)}</td>
    </tr>
  </table>

  <div class="footer">
    <p>Thank you for choosing HoodiesBus!</p>
    <p>www.hoodiesbus.com | support@hoodiesbus.com</p>
  </div>
</body>
</html>
    `;
  }
}

export default new PDFService();
