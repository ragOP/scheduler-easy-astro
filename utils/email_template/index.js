function discountEmailTemplate(discount, discount_code) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Your Soulmate Gift Awaits</title>
    </head>
    <body style="margin:0; padding:0; font-family: 'Arial', sans-serif; background-color:#fff0f5;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center" style="padding:40px 0;">
            <table width="600" cellpadding="0" cellspacing="0" border="0" 
                   style="background:#ffffff; border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.1); overflow:hidden;">
              
              <!-- Header Banner -->
              <tr>
                <td align="center" style="background:#e75480; color:#ffffff; padding:30px;">
                  <h1 style="margin:0; font-size:28px; font-weight:bold;">💖 Discover Your Soulmate Today!</h1>
                </td>
              </tr>
              
              <!-- Main Content -->
              <tr>
                <td style="padding:30px; text-align:center; color:#333;">
                  <p style="font-size:18px; margin-bottom:20px; font-weight:500;">
                    Ever wondered who your true soulmate is?  
                    Experience the magic of seeing your soulmate’s face – drawn just for you by gifted experts.
                  </p>
                  
                  <p style="font-size:16px; margin-bottom:20px;">
                    As a special gift, enjoy <strong>${discount}% OFF</strong> today using the code below:
                  </p>
                  
                  <p style="font-size:14px; color:#666; margin-top:30px;">
                    Hurry! Only a few spots left before this magical offer disappears ✨
                  </p>
                  
                  <a href="https://easyastro.in/cart?${discount_code}" 
                     style="margin-top:20px; display:inline-block; background:#d6336c; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:30px; font-size:16px; font-weight:bold; box-shadow:0 2px 6px rgba(0,0,0,0.15);">
                    🔮 Reveal My Soulmate Now
                  </a>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding:20px; text-align:center; font-size:12px; color:#999; background:#fff0f5;">
                  You’re receiving this email because you subscribed to EasyAstro.<br/>
                  If you no longer wish to receive these, <a href="#" style="color:#d6336c;">unsubscribe</a>.
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;
}

module.exports = { discountEmailTemplate };
