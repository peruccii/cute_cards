export class InviteTypeConstants {
  getLoveContent(qrCodeUrl: string) {
    return `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #ffe6f0; margin: 0; padding: 0; }
                      .email-container { background-color: #ffffff; width: 100%; max-width: 600px; margin: 20px auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); overflow: hidden; }
                      .header { background-color: #ff6f61; color: #ffffff; padding: 20px; text-align: center; border-bottom: 5px solid #ff3e4d; }
                      .header h1 { margin: 0; font-size: 26px; }
                      .body { padding: 30px; text-align: center; }
                      .body h2 { color: #333; font-size: 22px; }
                      .body p { color: #666; line-height: 1.6; font-size: 16px; }
                      .qr-code { margin: 20px 0; }
                      .qr-code img { width: 150px; height: 150px; border: 2px solid #ff6f61; border-radius: 8px; }
                      .footer { background-color: #ff6f61; color: #ffffff; padding: 10px; text-align: center; font-size: 12px; }
                  </style>
              </head>
              <body>
                  <div class="email-container">
                      <div class="header">
                          <h1>Obrigado pelo seu carinho!</h1>
                      </div>
                      <div class="body">
                          <h2>Olá</h2>
                          <p>Agradecemos de coração pela sua compra. Use o QR Code abaixo para acessar seu produto e surpreenda seu parceiro(a).</p>
                          <div class="qr-code">
                              <img src="${qrCodeUrl}" alt="QR Code">
                          </div>
                          <p>Se precisar de algo, estamos sempre aqui para ajudar.</p>
                      </div>
                      <div class="footer">
                          <p>&copy; 2025 Cute Cards. Todos os direitos reservados. Com amor!</p>
                      </div>
                  </div>
              </body>
              </html>
          `;
  }

  getBestFriendsContent(qrCodeUrl: string) {
    return `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #e6f7ff; margin: 0; padding: 0; }
                      .email-container { background-color: #ffffff; width: 100%; max-width: 600px; margin: 20px auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); overflow: hidden; }
                      .header { background-color: #5f9ea0; color: #ffffff; padding: 20px; text-align: center; border-bottom: 5px solid #4682b4; }
                      .header h1 { margin: 0; font-size: 26px; }
                      .body { padding: 30px; text-align: center; }
                      .body h2 { color: #333; font-size: 22px; }
                      .body p { color: #666; line-height: 1.6; font-size: 16px; }
                      .qr-code { margin: 20px 0; }
                      .qr-code img { width: 150px; height: 150px; border: 2px solid #5f9ea0; border-radius: 8px; }
                      .footer { background-color: #5f9ea0; color: #ffffff; padding: 10px; text-align: center; font-size: 12px; }
                  </style>
              </head>
              <body>
                  <div class="email-container">
                      <div class="header">
                          <h1>Amizade é tudo!</h1>
                      </div>
                      <div class="body">
                          <h2>Olá</h2>
                          <p>Agradecemos pela sua compra. Use o QR Code abaixo para acessar seu produto e compartilhar momentos incríveis com seu melhor amigo(a).</p>
                          <div class="qr-code">
                              <img src="${qrCodeUrl}" alt="QR Code">
                          </div>
                          <p>Conte conosco sempre que precisar.</p>
                      </div>
                      <div class="footer">
                          <p>&copy; 2025 Cute Cards. Todos os direitos reservados.</p>
                      </div>
                  </div>
              </body>
              </html>
          `;
  }

  getBirthdayContent(qrCodeUrl: string) {
    return `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fff8e1; margin: 0; padding: 0; }
                      .email-container { background-color: #ffffff; width: 100%; max-width: 600px; margin: 20px auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); overflow: hidden; }
                      .header { background-color: #ffd54f; color: #ffffff; padding: 20px; text-align: center; border-bottom: 5px solid #ffca28; }
                      .header h1 { margin: 0; font-size: 26px; }
                      .body { padding: 30px; text-align: center; }
                      .body h2 { color: #333; font-size: 22px; }
                      .body p { color: #666; line-height: 1.6; font-size: 16px; }
                      .qr-code { margin: 20px 0; }
                      .qr-code img { width: 150px; height: 150px; border: 2px solid #ffd54f; border-radius: 8px; }
                      .footer { background-color: #ffd54f; color: #ffffff; padding: 10px; text-align: center; font-size: 12px; }
                  </style>
              </head>
              <body>
                  <div class="email-container">
                      <div class="header">
                          <h1>Feliz Aniversário!</h1>
                      </div>
                      <div class="body">
                          <h2>Olá </h2>
                          <p>Desejamos tudo de bom no seu dia especial! Use o QR Code abaixo para acessar seu presente e tornar sua comemoração ainda mais incrível.</p>
                          <div class="qr-code">
                              <img src="${qrCodeUrl}" alt="QR Code">
                          </div>
                          <p>Estamos aqui para ajudar no que precisar.</p>
                      </div>
                      <div class="footer">
                          <p>&copy; 2025 Cute Cards. Todos os direitos reservados. Celebre com alegria!</p>
                      </div>
                  </div>
              </body>
              </html>
          `;
  }
}
