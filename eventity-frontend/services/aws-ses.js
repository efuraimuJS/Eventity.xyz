import * as AWS from "aws-sdk";
import * as nodemailer from "nodemailer";
import 'bootstrap/dist/css/bootstrap.css';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-1",
});
AWS.config.getCredentials(function (error) {
    if (error) {
        console.log(error.stack);
    }
});
const ses = new AWS.SES({apiVersion: "2010-12-01"});

// change this to the "to" email that you want
const adminMail = "wangulumaloba@gmail.com";

// Create a transporter of nodemailer
const transporter = nodemailer.createTransport({
    SES: ses,
});

export const sendUserEmail = async (userEmail) => {
    try {
        const response = await transporter.sendMail({
            from: adminMail,
            to: userEmail,
            subject: "Event Checkout",
            html: `
            <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html lang="">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title></title>
</head>
<body>
<div class="card">
  <div class="card-body">
    <div class="container mb-5 mt-3">
      <div class="row d-flex align-items-baseline">
        <div class="col-xl-9">
          <p style="color: #7e8d9f;font-size: 20px;">Invoice &gt;&gt; <strong>ID: #123-123</strong></p>
        </div>
      </div>
      <div class="container">
        <div class="col-md-12">
          <div class="text-center">
            <i class="far fa-building fa-4x ms-0" style="color:#8f8061 ;"></i>
            <p class="pt-2">Company Name</p>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-8">
            <ul class="list-unstyled">
              <li class="text-muted">To: <span style="color:#8f8061 ;">John Bootstrap</span></li>
              <li class="text-muted">Street, City</li>
              <li class="text-muted">State, Country</li>
              <li class="text-muted"><i class="fas fa-phone"></i> 123-456-789</li>
            </ul>
          </div>
          <div class="col-xl-4">
            <p class="text-muted">Invoice</p>
            <ul class="list-unstyled">
              <li class="text-muted"><i class="fas fa-circle" style="color:#8f8061 ;"></i> <span
                  class="fw-bold">ID:</span>#123-456</li>
              <li class="text-muted"><i class="fas fa-circle" style="color:#8f8061 ;"></i> <span
                  class="fw-bold">Creation Date: </span>Jun 23,2021</li>
              <li class="text-muted"><i class="fas fa-circle" style="color:#8f8061;"></i> <span
                  class="me-1 fw-bold">Status:</span><span class="badge bg-warning text-black fw-bold">
                  Unpaid</span></li>
            </ul>
          </div>
        </div>
        <div class="row my-2 mx-1 justify-content-center">
          <div class="col-md-2 mb-4 mb-md-0">
            <div class="
                        bg-image
                        ripple
                        rounded-5
                        mb-4
                        overflow-hidden
                        d-block
                        " data-ripple-color="light">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp"
                class="w-100" height="100px" alt="Elegant shoes and shirt" />
              <a href="#!">
                <div class="hover-overlay">
                  <div class="mask" style="background-color: hsla(0, 0%, 98.4%, 0.2)"></div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-7 mb-4 mb-md-0">
            <p class="fw-bold">Custom suit</p>
            <p class="mb-1">
              <span class="text-muted me-2">Size:</span><span>8.5</span>
            </p>
            <p>
              <span class="text-muted me-2">Color:</span><span>Gray</span>
            </p>
          </div>
          <div class="col-md-3 mb-4 mb-md-0">
            <h5 class="mb-2">
              <s class="text-muted me-2 small align-middle">$1500</s><span class="align-middle">$1050</span>
            </h5>
            <p class="text-danger"><small>You save 25%</small></p>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-xl-8">
            <p class="ms-3">Add additional notes and payment information</p>
          </div>
          <div class="col-xl-3">
            <ul class="list-unstyled">
              <li class="text-muted ms-3"><span class="text-black me-4">SubTotal</span>$1050</li>
              <li class="text-muted ms-3 mt-2"><span class="text-black me-4">Shipping</span>$15</li>
            </ul>
            <p class="text-black float-start"><span class="text-black me-3"> Total Amount</span><span
                style="font-size: 25px;">$1065</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</body>
</html>
`,
        })
        return response?.messageId ? {ok: true} : {ok: false, msg: "Failed to send email"}

    } catch (e) {
        console.log("ERROR", e.message);
        return {ok: false, msg: "Failed to send email"};

    }
}
