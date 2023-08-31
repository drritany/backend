"use strict";
///This contains the various utilities
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.frontend = exports.getUSDRate = exports.countryList = exports.getCurrentTime = exports.getCurrentDate = exports.capitalizeFirstLetter = exports.readSheet = exports.updateSheet = exports.createSheet = exports.metaData = exports.spreadsheetId = exports.googleSheets = exports.auth = exports.cartItem = exports.sendCartOrderEmail = exports.sendInquiryEmail = exports.sendSubnewsletterEmail = exports.sendEmail = void 0;
///Libraries -->
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const axios_1 = __importDefault(require("axios"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
///Commencing the code
const PriceKey = process.env.PRICE_FEED_KEY;
const SUPPORT_EMAIL = process.env.SENDER_EMAIL;
const SUPPORT_PASSWORD = process.env.SENDER_PASSWORD;
const SHEET_CREDENTIALS1 = {
    "type": process.env.GSHEET_TYPE,
    "project_id": process.env.GSHEET_PROJECT_ID,
    "private_key_id": process.env.GSHEET_PRIVATE_KEY_ID,
    "private_key": process.env.GSHEET_PRIVATE_KEY,
    "client_email": process.env.GSHEET_CLIENT_EMAIL,
    "client_id": process.env.GSHEET_CLIENT_ID,
    "auth_uri": process.env.GSHEET_AUTH_URI,
    "token_uri": process.env.GSHEET_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.GSHEET_AUTH_PROVIDER_x509_CERT_URL,
    "client_x509_cert_url": process.env.GSHEET_CLIENT_x509_CERT_UR,
    "universe_domain": process.env.GSHEET_UNIVERSE_DOMAIN
};
const SHEET_CREDENTIALS = {
    client_email: process.env.GSHEET_CLIENT_EMAIL,
    private_key: process.env.GSHEET_PRIVATE_KEY
};
/**
 * @notice This sends an email, works with gmail account for now
 * @param senderEmail The email address of the sender
 * @param senderPassword The password for the email address of the sender
 * @param recipientEmail The recipient's email address
 * @param subject The subject of the email to be sent
 * @param body The body message of the email to be sent
 * @returns The status of the sent email, whether successful or not
 */
const sendEmail = (senderName, senderEmail, senderPassword, recipientEmail, subject, body, template, context) => {
    let transporter = nodemailer_1.default.createTransport({
        host: 'smtp.privateemail.com',
        port: 465,
        secure: true,
        ///service: 'gmail',
        auth: {
            user: senderEmail,
            pass: senderPassword
        }
    });
    // point to the template folder
    const handlebarOptions = {
        extName: '.hbs',
        viewEngine: {
            partialsDir: path_1.default.resolve('./src/utils/emails/'),
            defaultLayout: false,
        },
        viewPath: path_1.default.resolve('./src/utils/emails/'),
    };
    // use a template file with nodemailer
    transporter.use('compile', (0, nodemailer_express_handlebars_1.default)(handlebarOptions));
    let mailOptions = {
        from: `${senderName} <${senderEmail}>`,
        to: recipientEmail,
        subject: subject,
        text: body,
        template: template,
        context: context
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return error.message;
        }
        else {
            console.log('Email sent: ' + info.response);
            return info.response;
        }
    });
};
exports.sendEmail = sendEmail;
/**
 * @notice This sends a subnewsletter email to a customer
 * @param recipientEmail The recipient's email address
 * @param recipientName The name of the recipient
 * @param subject The subject of the email to be sent
 * @param body The body message of the email to be sent
 * @returns The status of the sent email, whether successful or not
 */
const sendSubnewsletterEmail = async (recipientEmail) => {
    const template = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title></title>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
  
      <style type="text/css">
        @import url('https://fonts.googleapis.com/css?family=Inter');
        
        html {
          padding: 0px;
          overflow-x: hidden;
          /* border: 2px solid yellow; */
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          justify-content: center;
          font-family: 'Inter';
        }
  
        body {
          /* align-items: center; */
          position: absolute;
          /* border: 2px solid blue; */
          width: 95%;
          height: 95%;
        }
  
        main {
          /* align-items: center; */
          position: relative;
          border: 2px solid blue;
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 95%;
          height: 100%;
          padding: 1% 2.5%;
        }
  
        .logo {
          position: relative;
          border: 2px solid blue;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 95%;
          height: 7%;
          margin-bottom: 20px;
          top: 5%;
        }
  
        .logo img {
          position: relative;
          object-fit: contain;
          /* border: 2px solid blue; */
          width: 7%;
          height: 60%;
        }
  
        .message {
          border: 2px solid red;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 5%;
          height: 30%;
          top: 10%;
          font-size: 14px;
          line-height: 22px;
        }
  
        #body {
          border: 2px solid blue;
          position: relative;
          display: flex;
          flex-direction: column;
        }
  
      /* This is for mobile */
      @media (min-width: 550px) and (max-width: 1024px) {
        .logo img {
          width: 15%;
        }
      }
  
        /* This is for mobile */
        @media (min-width: 0px) and (max-width: 550px) {
  
          .logo {
            margin-bottom: 0px;
          }
  
          .logo img {
              /* border: 1px solid red; */
              width: 25%;
          }
  
          .brief {
            font-size: 18px;
            flex-direction: column;
          }
  
          .message {
            top: 20%;
            height: 40%;
          }
  
          #body {
            top: 5%;
          }
        }
  
        /* This is for mobile */
        @media (min-width: 0px) and (max-width: 300px) {
  
          .message {
            height: 50%;
          }
  
          #body {
            top: 5%;
          }
        }
      </style>
    </head>
  
    <body>
      <main>
        <header class="logo">
          <img 
              src="https://drive.google.com/uc?export=download&id=1RbUo9BSAyxfNmzVV_dzjC7E4nT9ZtbnV"
              alt="test"
          />
        </header>
        <div class="message">
          <span id="body">
            Hey,
          <br />
          <br />
              Thank you for subscribing to our newsletter! We are delighted to have you on board. Rest assured, you will be the first to receive updates whenever a new product is listed. Stay tuned for exciting news and offers! 
          <br />
          <br />
          Best regards, <br />
          Dr Ritany Customer Care
          </span>
        </div>
      </main>
      <script>
        
      </script>
    </body>
  </html>
  `;
    const body = `
  Hey,
  
  Thank you for subscribing to our newsletter! 
  We are delighted to have you on board. Rest assured, you will be the first to receive updates whenever a new product is listed. 
  Stay tuned for exciting news and offers!  

  Best regards, 
  Dr Ritany Customer Care
  `;
    const status = await (0, exports.sendEmail)("Dr Ritany Support", SUPPORT_EMAIL, SUPPORT_PASSWORD, recipientEmail, "Dr Ritany Newsletter Subscription", body, undefined, undefined);
    return status;
};
exports.sendSubnewsletterEmail = sendSubnewsletterEmail;
/**
 * @notice This sends a successful inquiry email to a customer
 * @param recipientEmail The recipient's email address
 * @param recipientName The name of the recipient
 * @param subject The subject of the email to be sent
 * @param body The body message of the email to be sent
 * @returns The status of the sent email, whether successful or not
 */
const sendInquiryEmail = (inquiry) => {
    const template = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <title></title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <style type="text/css">
    @import url('https://fonts.googleapis.com/css?family=Inter');
      html {
        padding: 0px;
        overflow-x: hidden;
        /* border: 2px solid yellow; */
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        font-family: 'Inter';
      }

      body {
        /* align-items: center; */
        position: absolute;
        /* border: 2px solid blue; */
        width: 95%;
        height: 95%;
      }

      main {
        /* align-items: center; */
        position: relative;
        border: 2px solid blue;
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 95%;
        height: 100%;
        padding: 1% 2.5%;
      }

      .logo {
        position: relative;
        border: 2px solid blue;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        width: 95%;
        height: 7%;
        margin-bottom: 20px;
        top: 5%;
      }

      .logo img {
        position: relative;
        object-fit: contain;
        /* border: 2px solid blue; */
        width: 7%;
        height: 60%;
      }

      .message {
        border: 2px solid blue;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 5%;
        top: 10%;
        font-size: 16px;
        line-height: 22px;
      }

      #salute {

      }

      #body {
        border: 2px solid blue;
        position: relative;
        display: flex;
        flex-direction: column;
        top: 15%;
      }

    /* This is for mobile */
    @media (min-width: 550px) and (max-width: 1024px) {
      .logo img {
        width: 15%;
      }
    }

      /* This is for mobile */
      @media (min-width: 0px) and (max-width: 550px) {

        .logo {
          margin-bottom: 0px;
        }

        .logo img {
            /* border: 1px solid red; */
            width: 25%;
        }

        .brief {
          font-size: 18px;
          flex-direction: column;
        }

        .message {
          font-size: 16px;
        }

        #body {
          top: 5%;
        }
      }
    </style>
  </head>

  <body>
    <main>
      <header class="logo">
        <img 
            src="https://drive.google.com/uc?export=download&id=1RbUo9BSAyxfNmzVV_dzjC7E4nT9ZtbnV"
            alt="test"
        />
      </header>
      <div class="message">
        <span id="salute">Dear ${inquiry.firstName},</span>
        <span id="body">
            Thank you for reaching out to us. We have received your message and our team will respond to you promptly. 
        <br />
        <br />
        Best regards, <br />
        Dr Ritany Customer Care
        </span>
      </div>
    </main>
    <script>
      
    </script>
  </body>
</html>
  `;
    const body = `
  Dear ${inquiry.firstName},
  
  Your message has been successfully sent. 
  Rest assured that our team is diligently reviewing your request, and we will get back to you shortly with the assistance you need.
  If you have any additional information inquiry, please feel free to share them with us. 

  Best regards, 
  Dr Ritany Customer Care
  `;
    const status = (0, exports.sendEmail)("Dr Ritany Support", SUPPORT_EMAIL, SUPPORT_PASSWORD, inquiry.emailAddress, "Dr Ritany Inquiry", body, undefined, undefined);
    return status;
};
exports.sendInquiryEmail = sendInquiryEmail;
/**
 * @notice This sends a cart order email to a customer
 * @param recipientEmail The recipient's email address
 * @param recipientName The name of the recipient
 * @param subject The subject of the email to be sent
 * @param body The body message of the email to be sent
 * @returns The status of the sent email, whether successful or not
 */
const sendCartOrderEmail = (order, symbol) => {
    const template = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <title></title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <style type="text/css">
      @import url('https://fonts.googleapis.com/css?family=Inter');
      html {
        padding: 0px;
        overflow-x: hidden;
        /* border: 2px solid yellow; */
        width: 100%;
        height: 120%;
        position: relative;
        display: flex;
        justify-content: center;
        font-family: 'Inter';
      }

      body {
        position: absolute;
        /* border: 2px solid blue; */
        width: 95%;
        height: 95%;
      }

      main {
        /* align-items: center; */
        position: relative;
        border: 2px solid blue;
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 95%;
        height: 100%;
        padding: 1% 2.5%;
      }

      .logo {
        border: 1px solid red;
      }

      .brief {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;
        border: 2px solid yellow;
        top: 2%;
        height: 25%;
      }

      .message {
        border: 1px solid red;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;
        font-size: 15px;
      }

      .brief_1 {
        font-size: 30px;
      }

      #brief_3 {
        position: relative;
        display: flex;
        flex-direction: row;
        border: 2px solid blue;
        justify-content: flex-end;
        gap: 0px;
        color: rgb(154, 158, 166);
        
      }

      #brief_3 hr {
        border: 2px solid blue;
      }

      #orderDate {
        font-size: 14px;
      }

      #orderDate span {
        font-size: 16px;
        color: black;
      }

      #deliveryDate {
        color: rgb(18, 183, 106);
        font-weight: 600;
        font-size: 16px;
      }

      .order_cart {
        border: 2px solid blue;
        overflow-x: hidden;
        height: 45%;
        border-top: 2px solid rgba(0, 0, 0, 0.09);
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1%;
        top: 2%;
      }

      .cartItem {
        border: 1px solid black;
        position: relative;
        display: flex;
        flex-direction: row;
        height: 20%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.09);
        padding: 1% 0.5%;
        align-items: center;
      }

      .itemImage {
        border: 1px solid red;
        position: relative;
        display: flex;
        left: 1%;
        justify-content: center;
        align-items: center;
        width: 4%;
        height: 95%;
      }

      #itemImg {
        width: 100%;
      }

      .itemName {
        border: 1px solid red;
        position: relative;
        display: flex;
        left: 2%;
        width: 40%;
        align-items: center;
        height: 95%;
      }

      .price_quantity {
        border: 1px solid red;
        position: relative;
        display: flex;
        left: 45%;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        align-items: center;
        width: 10%;
      }

      .price, 
      .quantity {
        border: 1px solid red;
        position: relative;
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
      }


      .order_address {
        border: 2px solid blue;
        height: 20%;
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        /* padding: 2% 0%; */
        border-top: 2px solid rgba(0, 0, 0, 0.09);
        top: 2%;
      }

      #payment {
        border: 1px solid red;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        width: 20%;
        height: 100%;
      }

      #address {
        border: 1px solid red;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        width: 30%;
        /* justify-content: flex-end; */
        align-items: flex-end;
      }

      .order_summary {
        border: 2px solid blue;
        height: 13%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 7px;
        padding: 2% 0%;
        border-top: 2px solid rgba(0, 0, 0, 0.09);
        top: 2%;
      }

      .heading {
        border: 1px solid red;
        position: relative;
        display: flex;
        //flex-direction: row;
        justify-content: space-between;
        width: 100%;
      }

      .prices {
        border: 2px solid blue;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 5px;
        width: 100%;
        top: 7%;
      }

      .prices div {
        /* border: 2px solid blue; */
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
      }

      #total {
        border-top: 2px dotted rgba(0, 0, 0, 0.09);
        padding: 0.5% 0%;
      }

      /* This is for mobile */
    @media (min-width: 550px) and (max-width: 1024px) {
      html {
        height: 100%;
      }

      .brief {
        height: 15%;
      }

    .order_cart {
      height: 40%;
    }

    #payment {
      width: 30%;
    }

    #address {
      width: 40%;
    }

      #logoImg {
        width: 20%;
        border: 1px solid red;
      }

      .itemImage {
            width: 10%; 
            height: 80%;
        } 

        .price_quantity {
            left: 33%;
            width: 15%; 
            height: 80%;
        }
    } 

       /* This is for mobile */
      @media (min-width: 0px) and (max-width: 550px) {

        .logo {
          margin-bottom: 0px;
        }

        #logoImg {
          width: 30%;
        }

        .brief {
          height: 20%;
        }

        .brief_1 {
          font-size: 16px;
          flex-direction: column;
        }

        #brief_3 {
          flex-direction: column;
          gap: 10px;
        }
        
        #brief_3 hr {
          display: none;
        }

        #deliveryDate {
          //border: 1px solid red;
          text-align: start;
          display: flex;
        }

        #orderDate {
          /* border: 1px solid red; */
        }
        .order_cart {
        height: 35%;
        }

        .itemImage {
            width: 15%; 
            height: 80%;
        }

        .itemName {
            font-size: 14px;
            width: 40%; 
            height: 80%;
            left: 3%;
        }

        .order_address { 
          height: 15%
        }

        .price_quantity {
            font-size: 14px;
            left: 15%;
            width: 25%; 
            height: 80%;
        }

        #payment {
         width: 30%;
      }

      #address {
        width: 65%;
      }
      }
    </style>
  </head>

  <body>
    <main>
      <div class="logo">
        <img 
          src="https://drive.google.com/uc?export=download&id=1RbUo9BSAyxfNmzVV_dzjC7E4nT9ZtbnV"
          alt="test"
        />
      </div>
      <div class="brief">
        <span class="brief_1">
          <strong> Order ID: ${order._id} </strong>
        </span>
        <div class="message">
          <span id="salute">Dear ${order.customerSpec.fullName},</span>
          <span id="body">
              Thank you for ordering, your order has been successfully confirmed. 
          </span>
        </div>
        <div id="brief_3">
          <span id="orderDate">Order Date: <span><strong>Feb 16, 2022</strong></span></span>
          <hr />
          <div id="deliveryDate">
            <img />
            <span>Estimated Delivery: May 16, 2023</span>
          </div>
        </div>
      </div>
      <div class="order_cart">
      </div>
      <div class="order_address">
        <div id="payment">
          <span><strong>Payment</strong></span>
          <span>On Delivery</span>
        </div>
        <div id="address">
          <span><strong>Delivery Info</strong></span>
          <span>${order.customerSpec.deliveryAddress}</span>
          <span>${order.customerSpec.state}, ${order.customerSpec.country}</span>
          <span>${order.customerSpec.phoneNumbers[0]}</span>
        </div>
      </div>
      <div class="order_summary">
        <div class="heading">
          <span><strong>Order Summary</strong></span>
        </div>
        <div class="prices">
          <div>
            <span>Subtotal</span>
            <span>$300.00</span>
          </div>
          <div>
            <span>Delivery</span>
            <span>$0.00</span>
          </div>
          <div id="total">
            <span>Total</span>
            <span>$300.00</span>
          </div>
        </div>
        
      </div>
    </main>
    <script>
    const cartList = document.getElementsByClassName('order_cart');
      

      for (let i = 0; i < 10; i++) {
        cartList[0].innerHTML += cartItem();
        //console.log("test: ", cartList[i]);
      }
      //console.log("testing: ", cartList)
      </script>
  </body>
</html>

  `;
    const body = `
  Dear ${order.customerSpec.fullName},

  Thank you for ordering, your order has been successfully confirmed.

  You can view your cart order summary at ${exports.frontend}/cart/${order._id}

  Best regards,
  Dr Ritany Customer Care
  `;
    const status = (0, exports.sendEmail)("Dr Ritany Support", SUPPORT_EMAIL, SUPPORT_PASSWORD, order.customerSpec.email, "Dr Ritany Cart Order", body, undefined, undefined);
    return status;
};
exports.sendCartOrderEmail = sendCartOrderEmail;
const cartItem = (itemImage, itemName, currency, itemPrice, itemQuantity) => {
    return `
  <div class="cartItem">
    <div class="itemImage">
        <img 
            id="itemImg"
            src=${itemImage}
            alt="test"
        />
    </div>
    <div class="itemName">
        <span>${itemName}</span>
    </div>
    <div class="price_quantity">
        <div class="price">
            <span>
                <strong>${currency} ${itemPrice.toLocaleString("en-US")}</strong>
            </span>
        </div>
        <div class="quantity">
            <span>Qty: ${itemQuantity}</span>
        </div>
    </div>
  </div>
`;
};
exports.cartItem = cartItem;
const yoni_steam = {
    "category": "Health",
    "subCategory": "Detoxification",
    "name": "A2Z Steam Detox",
    "images": ["./images/steam_1.jpg", "./images/steam_2.webp", "./images/steam_1.jpg", "./images/steam_1.jpg"],
    "videos": ["./images/steam_1.jpg"],
    "price": 22.61,
    "orders": 319144,
    "description": "A2Z steam detox is a chinese herbal medicine as prepared by the masters of herb to help solve gynogological issues as so frequently associated with women since which are likely prone to infections.",
    "specification": {
        "brand": "A2Z",
        "itemForm": "Steam",
        "itemCount": 1,
        "userAgeRange": "Above 18 year's old",
        "gender": "Women",
        "benefits": [
            "It cleanses the internal system through the vagina",
            "It eliminates bad odor",
            "Treats yeast infections",
            "Increases fertility, libido and wetness",
            "It relives stress and fatigue"
        ],
        "prescription": [
            "Place herb in a container",
            "Pour hot water and leave for 30 secs",
            "Sit or squat over container of infused steam"
        ],
        "ingredients": [
            "Mugwort",
            "Rosemary",
            "Lavender",
            "Yarrow",
            "Partridge berry",
            "Motherwort",
            "Calendula",
            "Rose Petals",
            "Aloe Vera leaflets."
        ],
        "productOrigin": "China",
        "weight": 0.001
    },
};
const panty_liner = {
    "category": "Health",
    "subCategory": "Detoxification",
    "name": "Norland Panty Liner",
    "images": ["./images/pant_liner_1.png", "./images/pant_liner_2.png", "./images/pant_liner_3.webp", "./images/pant_liner_3.webp"],
    "videos": ["./images/pant_liner_1.png"],
    "price": 31.17,
    "orders": 491830,
    "description": "Norland Anion Panty Liner, is a medicated liner that contains anion strips which can purify the vaginal environment. Norland Anion Panty Liner, prevent menses from breeding anaerobic bacteria and eliminate vaginal odor, prevent itching, resist bacteria on the outside, and forestall diseases within the body.",
    "specification": {
        "brand": "Norland",
        "itemForm": "Pad",
        "itemCount": 30,
        "userAgeRange": "All",
        "gender": "Unisex",
        "benefits": [
            "Eliminates menstraul cramps",
            "It eliminates odor",
            "It prevents UTI",
            "It is anti-bacterial",
            "It promotes metabolism and improves the endocrine system"
        ],
        "prescription": [
            "Take out the pantliner from its pack",
            "Place it in your underwear and wear",
            "Change the pant liner daily"
        ],
        "ingredients": [
            "Anion Strip",
            "Non Woven Fabric",
            "Breathable Sheet"
        ],
        "productOrigin": "China",
        "weight": 0.01
    },
};
///JSON format for product model
const kinoki = {
    "category": "Health",
    "subCategory": "Detoxification",
    "name": "Kinoki Cleansing Detox Foot Pads",
    "images": ["./images/kinoki_1.webp", "./images/kinoki_2.webp", "./images/kinoki_3.webp", "./images/kinoki_4.jpg"],
    "videos": ["./images/kinoki_1.webp"],
    "price": 30.92,
    "orders": 487965,
    "description": "Kinoki foot pads contain natural ingredients which stimulate these acupuncture points through the combined action of wood/bamboo vinegar, far-infrared energy and negative ion emissions. This stimulation results in the breakdown of water and waste molecules that free blockages in the circulatory and lymphatic systems. Cleansing naturally begins in the soles of our feet.",
    "specification": {
        "brand": "Kiyome",
        "itemForm": "Pad",
        "itemCount": 10,
        "userAgeRange": "Above 18 year's old",
        "gender": "Unisex",
        "benefits": [
            "It improves your metabolism and blood circulation",
            "It relieves stress and aches",
            "Release unwanted toxins",
            "Increase your energy level",
            "Improve weight loss"
        ],
        "prescription": [
            "Apply Kinoki detox pad an hour before bed time",
            "Wash and dry your feet before application",
            "Take one adhesive sheet and slowly peel off paper",
            "Place the foot pad on the adhesive where noted to 'Put adhesive sheet on this side' and place onto the soles of your feet or the desired area of other body part.",
            "Wear for 8-10 hours then remove pad.",
            "Wipe surface with wet towel until it's no longer sticky.",
            "Used patches will appear dark greenish or grayish as they absorb toxins and waste matter from your body.",
            "A foot pad a night is recommended"
        ],
        "ingredients": [
            "Bamboo Vinegar",
            "Tourmaline",
            "Chitin",
            "Detox Herbs"
        ],
        "productOrigin": "Japan",
        "weight": 0.3
    }
};
const wuqing_women = {
    "category": "Health",
    "subCategory": "Detoxification",
    "name": "Wuqing Women Health Care Pad",
    "images": ["./images/wuqing_women_1.jpg", "./images/wuqing_women_2.png", "./images/wuqing_women_3.png", "./images/wuqing_women_4.jpg"],
    "videos": ["./images/wuqing_women_1.jpg"],
    "price": 99,
    "orders": 417335,
    "description": "Wuqing Women Health Care Pad is a small, easily disposable absorbent nourishing health pantyliner for women, worn inside close-fitting underwear that perfectly combines energy detoxification(Ge ion energy, Anion energy and Far infrared energy) and herbal maintenance, this ushers in a new era of reproductive health",
    "specification": {
        "brand": "Norland",
        "itemForm": "Pad",
        "itemCount": 14,
        "userAgeRange": "Above 18 year's old",
        "gender": "Women",
        "benefits": [
            "It has anti-aging, anti-cancer and anti-fatigue effects",
            "It used to treat irregular menses",
            "Produces it's beneficial actions in post menopausal women",
            "Shrink fibroid and correct hormonal imbalance",
            "Good for gynecological problem"
        ],
        "prescription": [
            "Remove the sticker and stick it on the perineal area at the bottom of underpants",
            "If more than a quarter of the pad is moist with discharge, please replace it",
            "Its recommended to change the pad every 4-6 hours",
            "People are pregnant or suffer from allergies should use with caution"
        ],
        "ingredients": [
            "Cotton Mesh",
            "Functional Chip",
            "Absorbent Paper",
            "Breathable Film"
        ],
        "productOrigin": "China",
        "weight": 0.3
    }
};
const wuqing_men = {
    "category": "Health",
    "subCategory": "Detoxification",
    "name": "Wuqing Men Health Care Pad",
    "images": ["./images/wuqing_men_1.png", "./images/wuqing_men_2.png", "./images/wuqing_men_3.png", "./images/wuqing_men_4.png"],
    "videos": ["./images/wuqing_men_1.png"],
    "price": 99,
    "orders": 400631,
    "description": "Wuqing Men Health Care Pad is a small, easily disposable absorbent nourishing health pantyliner for men, worn inside close-fitting underwear that perfectly combines energy detoxification(Ge ion energy, Anion energy and Far infrared energy) and herbal maintenance, this ushers in a new era of reproductive health",
    "specification": {
        "brand": "Norland",
        "itemForm": "Pad",
        "itemCount": 14,
        "userAgeRange": "Above 18 year's old",
        "gender": "Men",
        "benefits": [
            "It has anti-aging, anti-cancer and anti-fatigue effects",
            "It corrects hormonal imbalance",
            "It removes toxins and improves sleep",
            "It's very helpful in prostrate issues",
            "It improves erectile function and boost sexual energy"
        ],
        "prescription": [
            "Remove the pad from its pack and position it at the middle of the underwear.",
            "When wearing your underwear with the pad affixed make sure the scrotum rests on the pad.",
            "Use 1 pad for about 4 to 6 hours. Dispose after 1 use."
        ],
        "ingredients": [
            "Cotton Mesh",
            "Functional Chip",
            "Absorbent Paper",
            "Breathable Film"
        ],
        "productOrigin": "China",
        "weight": 0.3
    }
};
const womb_tea = {
    "category": "Health",
    "subCategory": "Detoxification",
    "name": "Womb Detox Tea",
    "images": ["./images/womb_tea_1.jpg", "./images/womb_tea_2.jpg", "./images/womb_tea_3.jpg", "./images/womb_tea_4.jpg"],
    "videos": ["./images/womb_tea_1.jpg"],
    "price": 42.8,
    "orders": 520031,
    "description": "Wins Jown Womb Detox Tea contains Dong Quai which has been used in the traditional Asian medicine as a female reproductive tonic, menstraul regulator and remedy for amenorrhea for at least 20 centuries",
    "specification": {
        "brand": "Wins Jown",
        "itemForm": "Tea Bag",
        "itemCount": 10,
        "userAgeRange": "Above 18 year's old",
        "gender": "Women",
        "benefits": [
            "It relieves menstrual cramps and heavy menses",
            "It detoxifies the womb and vagina",
            "It helps in solving fertility issues",
            "It's designed for women who are trying to conceive",
            "It promotes female reproductive wellness and hormonal balance"
        ],
        "prescription": [
            "Put a bag in cup of hot water",
            "Leave for 10 minutes",
            "A bag daily is recommended"
        ],
        "ingredients": [
            "Red Date",
            "Rose Flower",
            "Chinese Wolfberry",
            "Longan",
            "Dried Ginger",
            "Dong Quai"
        ],
        "productOrigin": "China",
        "weight": 0.3
    }
};
const male_fertility_tea = {
    "category": "Health",
    "subCategory": "Detoxification",
    "name": "Male Fertility Tea",
    "images": ["./images/male_tea_1.jpg", "./images/male_tea_2.webp", "./images/male_tea_3.jpeg", "./images/male_tea_4.jpg"],
    "videos": ["./images/male_tea_1.jpg"],
    "price": 39.03,
    "orders": 531233,
    "description": "Wins Jown Male Fertility Tea has been specially formulated with various roots and herbs that have been scientifically proven to boost sperm count, sperm quality, sperm motility, and enhance the male reproductive system.",
    "specification": {
        "brand": "Wins Jown",
        "itemForm": "Tea Bag",
        "itemCount": 10,
        "userAgeRange": "Above 18 year's old",
        "gender": "Men",
        "benefits": [
            "It enhances male fertility",
            "It increases sperm vitality",
            "Improves libido",
            "It improves enery and stamina",
            "It nourishes the kidney"
        ],
        "prescription": [
            "Put a bag in cup of hot water",
            "Leave for 10 minutes",
            "A bag daily is recommended"
        ],
        "ingredients": [
            "Maca Root",
            "Fructus Jujubae",
            "Fructus Lycii",
            "Mulberry",
            "Radix Ginseng",
            "Rhizoma Polygonati"
        ],
        "productOrigin": "China",
        "weight": 0.3
    }
};
const kuding_tea = {
    "category": "Health",
    "subCategory": "Detoxification",
    "name": "Kuding Tea",
    "images": ["./images/kuding_tea_1.jpg", "./images/kuding_tea_2.jpeg", "./images/kuding_tea_3.jpg", "./images/kuding_tea_4.jpg"],
    "videos": ["./images/kuding_tea_1.jpg"],
    "price": 38.3,
    "orders": 521204,
    "description": "Norland Kuding tea is a unique blend with heart health benefits. It helps in regulating the heart rhythm, increases blood circulation and reduces blood cholesterol.",
    "specification": {
        "brand": "Norland",
        "itemForm": "Tea Bag",
        "itemCount": 20,
        "userAgeRange": "Above 18 year's old",
        "gender": "Unisex",
        "benefits": [
            "It prolongs life",
            "It coordinates the intestines and stomach",
            "It helps in losing weight",
            "It helps prevent cancer",
            "It helps in adjusting the three HIGHs (high blood pressure, high cholesterol and high blood sugar"
        ],
        "prescription": [
            "Put a bag in cup of hot water",
            "Leave for 10 minutes",
            "A bag daily is recommended"
        ],
        "ingredients": [
            "Big Leaf Holly",
            "Lotus Leaf",
            "Dark Tea"
        ],
        "productOrigin": "China",
        "weight": 0.4
    }
};
const detox_pack = {
    "category": "Health",
    "subCategory": "Detoxification",
    "name": "Norland Detox Pack",
    "images": ["./images/detox_pack_1.jpeg", "./images/detox_pack_2.webp", "./images/detox_pack_3.webp", "./images/detox_pack_4.png"],
    "videos": ["./images/detox_pack_1.jpeg"],
    "price": 1099,
    "orders": 352724,
    "description": `Norland Detox Pack is the only detox that safely and rapidly deal out Toxins off Five Organs, focusing on the Chinese Five Basic Element Theory for ‘whole body’ health by removing toxic scale from your kidneys, liver, lung, heart, spleen at once without side effects compared to other detoxes.
                  Revolutionary Quantum Magnetization Technology increases the efficacy of herbal detox ingredients by more than 100 times.`,
    "specification": {
        "brand": "Norland",
        "itemForm": "Bottle",
        "itemCount": 6,
        "userAgeRange": "Above 18 year's old",
        "gender": "Unisex",
        "benefits": [
            "It detoxifies the body systematically",
            "It prevents cancer",
            "It reduces the period of terminal diseases",
            "It eliminates toxins deposited in the body systems",
            "It improves the overall health, wellbeing and hormonal balance"
        ],
        "prescription": [
            "Not recommended for children, elderly, pregnant, nursing mothers and bleeding person",
            "Be on light food prior to administration, abstain from food 4hrs before medication",
            "From 2pm to 6pm don't eat except water or fruit, By 6pm take the first green bottle and take 400mls of water or more",
            "At 8pm take another green bottle and 400mls of water or more",
            "At 10pm take one silver bottle, do not take water, then lie down with your back on the bed for 2hrs without turning side ways",
            "At 6am take another green bottle and 400mls of water or more",
            "At 8am take the 4th green bottle and 400mls of water or more",
            "At 8:05am take the last silver bottle, don't take any water and lie down for 2hrs again",
            "The detoxification process should last up to 3 months or more systematically",
            "Don't rush back to heavy diet but gradually to allow for proper detoxification"
        ],
        "ingredients": [
            "Water",
            'Sorbitol Syrup',
            "Apples",
            "Bitter Melon Juice (pulp)",
            "Lemon Juice",
            "Banana Pulp (sauce)",
            "Sugar",
            "Pomnegranate Juice Concentrate",
            "Red Grape juice Concentrate",
            "Red Grapefruit Juice Concentrate",
            "Snow Lotus Culture",
            "Fragrant Solomenseal Rhizome",
            "Licorice",
            "Dark Plum Juice Concentrate",
            "Finger Citron",
            "Dipotassium Hydrogen Phosphate",
            "Sodium Bicarbonate",
            "Vitamin C",
            "Wheat Low Poly Peptide",
            "Potassium Dihydrogen Phosphate",
            "Pectin",
            "Edible Flavor",
            "Lactobacillus Casei",
            "Lactobacillus Acidophilus",
            "Bifidobacterium Adolescentis",
            "Olive Oil"
        ],
        "productOrigin": "China",
        "weight": 0.5
    }
};
const skin_detox = {
    "category": "Health",
    "subCategory": "Detoxification",
    "name": "Simple Skin Detox",
    "images": ["./images/face_detox_1.jpg", "./images/face_detox_2.jpg", "./images/face_detox_3.jpg", "./images/face_detox_4.jpg"],
    "videos": ["./images/face_detox_1.jpg"],
    "price": 38.2,
    "orders": 652724,
    "description": "Simple purifying facial wash is skin detox that deeply cleanses the skin with thyme, zinc and witch hazel, leaving you with an overall shinning and clear skin",
    "specification": {
        "brand": "Simple",
        "itemForm": "Cleanser",
        "itemCount": 1,
        "userAgeRange": "Above 18 year's old",
        "gender": "Unisex",
        "benefits": [
            "It helps prevent spots and blemishes",
            "Boosted with 5% active witch hazel to efficiently remove excess oil and leave skin purified and balanced",
            "Made with a detoxifying blend of thyme, zinc and witch hazel, it deeply cleanses impurities, oil and make-up"
        ],
        "prescription": [
            "Pour a small amount unto your clean hands",
            "Massage unto wet skin and leave for 5 - 10 minutes",
            "Rinse thoroughly"
        ],
        "ingredients": [
            "Thyme",
            "Zinc",
            "Witch Hazel"
        ],
        "productOrigin": "United Kingdom",
        "weight": 0.2
    }
};
const lung_tea = {
    "category": "Health",
    "subCategory": "Detoxification",
    "name": "Lianhua Lung Clearing Tea",
    "images": ["./images/lung_tea_1.webp", "./images/lung_tea_2.webp", "./images/lung_tea_3.webp", "./images/lung_tea_4.webp"],
    "videos": ["./images/lung_tea_1.webp"],
    "price": 32.91,
    "orders": 352724,
    "description": "Lianhua Lung Clearing Tea is a natural Chinese herbs that has been proven to effectively clear throat, cleanse the lungs off flu-like viruses, boost the immmune system and respiratory system",
    "specification": {
        "brand": "Wins Jown",
        "itemForm": "Tea Bag",
        "itemCount": 20,
        "userAgeRange": "All",
        "gender": "Unisex",
        "benefits": [
            "It helps prevent cold",
            "It boosts the overall wellbeing of the respiratory system",
            "It eliminates phlegm",
            "It boosts the immune system",
            "Its good for smokers"
        ],
        "prescription": [
            "Put a bag in cup of hot water",
            "Leave for 10 minutes",
            "A bag daily is recommended"
        ],
        "ingredients": [
            "Forsythia",
            "Honeysuckle",
            "Almond",
            "Banlangen",
            "Cordate Houttyynia",
            "Ageratum",
            "Pieplant",
            "Rhodiola Root",
            "Menthol",
            "Liquorice"
        ],
        "productOrigin": "China",
        "weight": 0.3
    }
};
// const auth_ = async () => {
//   const googleAuth = new google.auth.GoogleAuth({
//     keyFile: "credentials.json",
//     scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//   });
//   // Create client instance for auth
//   const client = await googleAuth.getClient();
//   const googleSheets = google.sheets({ version: 'v4', auth: googleAuth });
// }
exports.auth = new googleapis_1.google.auth.GoogleAuth({
    credentials: SHEET_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
// Create client instance for auth
const client = async () => {
    return await exports.auth.getClient();
};
// Instance of Google Sheets API
exports.googleSheets = googleapis_1.google.sheets({ version: 'v4', auth: exports.auth });
exports.spreadsheetId = process.env.GSHEET_ID1;
// Get metadata about spreadsheet
const metaData = async () => {
    return await exports.googleSheets.spreadsheets.get({
        spreadsheetId: exports.spreadsheetId,
    });
};
exports.metaData = metaData;
// export const appendSheet = async () => {
//   await googleSheets.spreadsheets.values.append({
//     spreadsheetId,
//     range: "Uganda",
//     valueInputOption: "USER_ENTERED",
//     requestBody: {
//       values: [["Name", "Age"]],
//       //format: { textFormat: }
//     },
//   });
//   return googleSheets.spreadsheets.batchUpdate({
//     spreadsheetId,
//     requestBody: {
//       requests: [
//         {"repeatCell": {
//             "range": {
//                 "sheetId": 0,
//                 "startRowIndex": 0,
//                 "endRowIndex": 1
//             },
//             "cell": {
//                 "userEnteredFormat": {
//                     "textFormat": {
//                         "bold": true
//                     }
//                 }
//             },
//             "fields": "userEnteredFormat.textFormat.bold"
//         }}
//      ]
//     }
//   })
//   //   requests: [
//   //         {"repeatCell": {
//   //           "range": {
//   //               //"sheetId": 0,
//   //               "startRowIndex": 0,
//   //               "endRowIndex": 1
//   //           },
//   //           "cell": {
//   //               "userEnteredFormat": {
//   //                   "textFormat": {
//   //                       "bold": true
//   //                   }
//   //               }
//   //           },
//   //           "fields": "userEnteredFormat.textFormat.bold"
//   //       }},
//   //     {"addSheet": {
//   //          // Add properties for the new sheet
//   //          "properties": {
//   //              // "sheetId": number,
//   //              "title": "Uganda_Sheet",
//   //              "index": 2,
//   //              // "sheetType": enum(SheetType),
//   //              // "gridProperties": {
//   //              //     object(GridProperties)
//   //              // },
//   //              // "hidden": boolean,
//   //              // "tabColor": {
//   //              //     object(Color)
//   //              // },
//   //              // "rightToLeft": boolean
//   //          }
//   //      }
//   //  }]
//   //   },
//   // })
// }
/**
 * @notice This handles the function for creating a sheet
 * @returns .....
 */
const createSheet = async (title, headers) => {
    exports.googleSheets.spreadsheets.batchUpdate({
        spreadsheetId: exports.spreadsheetId,
        requestBody: {
            requests: [
                { "repeatCell": {
                        "range": {
                            //"sheetId": 0,
                            "startRowIndex": 0,
                            "endRowIndex": 1
                        },
                        "cell": {
                            "userEnteredFormat": {
                                "textFormat": {
                                    "bold": true
                                }
                            }
                        },
                        "fields": "userEnteredFormat.textFormat.bold"
                    } },
                { "addSheet": {
                        // Add properties for the new sheet
                        "properties": {
                            "title": title,
                            "index": 2,
                        }
                    } }
            ]
        }
    });
    await exports.googleSheets.spreadsheets.values.append({
        spreadsheetId: exports.spreadsheetId,
        range: title,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [headers],
            //format: { textFormat: }
        },
    });
};
exports.createSheet = createSheet;
/**
 * @notice This handles the function for updating a sheet
 * @param spreadsheetId The id sheet to be updated
 * @param data The array of datas to be updated
 */
const updateSheet = async (data) => {
    try {
        await exports.googleSheets.spreadsheets.values.append({
            spreadsheetId: exports.spreadsheetId,
            range: "Order_Sheet",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [data]
            },
        });
        await exports.googleSheets.spreadsheets.batchUpdate({
            spreadsheetId: exports.spreadsheetId,
            requestBody: {
                requests: [
                    { "repeatCell": {
                            "cell": {
                                "userEnteredFormat": {
                                    horizontalAlignment: "CENTER"
                                }
                            },
                            "fields": 'userEnteredFormat(horizontalAlignment)'
                        }
                    }
                ]
            }
        });
        return "Logged successfully";
    }
    catch (e) {
        console.log("Sheet Error: ", e);
        return "Logged Unsuccessfully";
    }
};
exports.updateSheet = updateSheet;
/**
 * @notice This handles the reading of a sheet
 * @param sheet The sheet to be updated
 * @returns .....
 */
const readSheet = async (sheet) => { };
exports.readSheet = readSheet;
/**
 * @notice This capitalizes every first letter of a word
 * @param data The datas to be capitalized
 * @returns The capitalized data
 */
const capitalizeFirstLetter = (data) => {
    if (typeof data === 'string') {
        return data.replace(/\b\w/g, match => match.toUpperCase());
    }
    else if (Array.isArray(data)) {
        return data.map(item => {
            if (typeof item === 'string') {
                return item.replace(/\b\w/g, match => match.toUpperCase());
            }
            return item;
        });
    }
    else {
        undefined;
    }
};
exports.capitalizeFirstLetter = capitalizeFirstLetter;
/**
 * @notice This gets the current date
 * @returns The current date
 */
const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    // Format the date as desired, e.g., "YYYY-MM-DD"
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};
exports.getCurrentDate = getCurrentDate;
/**
 * @notice This gets the current time
 * @returns The current time
 */
const getCurrentTime = () => {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    const meridian = hours >= 12 ? 'PM' : 'AM';
    // Convert hours to 12-hour format
    hours = hours % 12 || 12;
    // Add leading zeros if necessary
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    // Format the time as desired, e.g., "hh:mm AM/PM"
    const formattedTime = `${formattedHours}:${formattedMinutes} ${meridian}`;
    return formattedTime;
};
exports.getCurrentTime = getCurrentTime;
///This contains the number of countries that we operate in
exports.countryList = [
    { country: 'United States', countryCode: 'US', currency: "USD", currencySymbol: "&#36;" },
    { country: 'Canada', countryCode: 'CA', currency: "CAD", currencySymbol: "&#36;" },
    { country: 'United Kingdom', countryCode: 'GB', currency: "GBP", currencySymbol: "&#163;" },
    { country: 'Egypt', countryCode: 'EG', currency: "EGP", currencySymbol: "&#163;" },
    { country: 'Ghana', countryCode: 'GH', currency: "GHS", currencySymbol: "&#8373;" },
    { country: 'Nigeria', countryCode: 'NG', currency: "NGN", currencySymbol: '&#8358;' },
    { country: 'South Africa', countryCode: 'ZA', currency: "ZAR", currencySymbol: "R" },
    { country: 'Rwanda', countryCode: 'RW', currency: "RWF", currencySymbol: "RWF" },
    { country: 'Uganda', countryCode: 'UG', currency: "UGX", currencySymbol: "USh" },
    { country: 'Kenya', countryCode: 'KE', currency: "KES", currencySymbol: "KSh" },
    { country: 'Germany', countryCode: 'DE', currency: "EUR", currencySymbol: "&#8364;" },
    { country: 'Australia', countryCode: 'AU', currency: "AUD", currencySymbol: "&#36;" },
    { country: 'India', countryCode: 'IN', currency: "INR", currencySymbol: "&#8377;" }
];
///This function gets the usd rate of a currency
const getUSDRate = async (currencyCode) => {
    let rate;
    const response = await axios_1.default.get(`https://openexchangerates.org/api/latest.json?app_id=${PriceKey}`);
    //console.log("Response: ", response)
    const { base, rates } = await response.data;
    if (rates) {
        rate = Number((rates[currencyCode]).toFixed(2));
    }
    else {
        rate = 1;
    }
    return rate;
};
exports.getUSDRate = getUSDRate;
exports.frontend = "http://localhost:3000";
