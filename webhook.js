import { GoogleSpreadsheet } from 'google-spreadsheet';

export default async function handler(req, res) {
  res.status(200).send("OK"); // HEMEN cevapla

  const SHEET_ID = "1rnQdDqEYS-tUqJTt-RZPiG3DX5C3aOGLNLNZj4yUXXk"; // kendi Sheet ID'n
  const CLIENT_EMAIL = "mailerliteupdater@mailerliteupdater.iam.gserviceaccount.com"; // Service Account mail
  const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCZIn2NcmofuanD\ncPTfUQq+tX+yQczgwkVPxC3b3mG/4srihWGPvv9hX1zOZyS6vJHBtmiO1IFfWJ/n\nwRkNEj2jYfMd8zdHBJ3RAqCMp7jPghGqTggC+kezQAKF3GIPwFp79BVXjNMh/oPv\nqG8Tp85n616eRzmdaAT7XrHNbwztpo5MwAaMGfwtJhpaGMNqs4CcvVeGx85sfEQF\nnUd4RI4Pr4J0K35l5TyD5guOdegUc1kyzF0dhI+t+Wbe0enX7hqP6+L9ybt4BQRo\ndCd+qp2ztaSwXfMnoHVj7cnw/5j/C/AsGHh1S9qXdsqvwnr74sJeFzqfwmN9k+ik\nuQFWPDvRAgMBAAECggEAA7KmN/h+B1r11ERnDV+8QLjkJvK3FuuMLP8ZMmWCcisj\n8L2GAiimItILZrU6UJi9L+oXWYrPz8GCWJwJM8s8eAFQJLZODtkRhiMfmoK2dojd\nX1cRgiAZaiTsuZrbNvNKywFohuz/vSLo89b0s7W00ZMiW1pv0dUmknJwPskXwEMT\nzmp7/Xsqtd0nU93+dSCiW5JGAriF5Crn40alSCliSKhIsfIJwHAdfYY6Lb3HtLcw\naVtR+rNlfX8+b+Ziw+i857XAnGSn/iTu4AkKNuY6eT/zZsxZoEQVwWOlabr6ahio\nv8IvSsPI2MCyMS1+iUHekB752h0knIXip5i9rqU9hwKBgQDXhBAk0fPSsTMQgIYo\nCR/NsWGaXCPhMSi97O2OKgN8D5/96kd4doheyzh1KNbhNHNhl4iiAQqpTrnwd9Ql\nsw/5ISmcs2mpxMSPhJMkZtPbORicOmTcT3YDEzB3/KFqVyn5+ykRmaHsf51uyFZh\n4/WhT+wzkxtptNr3CbXi3r9RJwKBgQC15pUPfs+M5KBXaWMKFSPdNARc9N7T7wB0\nhs217dalEArmJZOOvG86Gl0WrKF+godlU/h+pXoOxqg8aKM2NYBznG5rPDBJaUCE\npqN8WW/9rUHfHf+IxAkOJ/xkF4lYEjVDFbXgUUpeotg9sOTxdAsz8KJ89xWv80sg\nddLc/422RwKBgQCm1jdhKZ8lJcQwLC6u45FZPM4gHuAvvkyZ6sZj3aZg7f+fIzQ8\nzxX2vD9ygzEFmgMQM6y0LTZBpw5OV5VFsf7Vj5SVGFbd89NufuUhsvCiruqcVqAp\n5OGos7w7xrh2iA+Y05QRaetuF8SaNECa+0v1mtdxfZolFLrFryC9Bk741QKBgEYz\nqIGjclyw+8Tgkm2YvQ+o/KoXg0wN6IIQaKH3Gaj4qQwromgrB05IUHboxyb5H2IW\n50eRe6rqNpGh3KOWQG3eCKtwPj6G1XScj2n1Zohj7pE6lZ1l8wy4l+rVPpdz54Rt\ng5UAKpCdjpE4jRM2swAntb4+6erPHcZ4UpoiMsIPAoGAWgeV8bA8RLmxwxNFKYEy\nuryLuHaJdLLAuRyyKiAjt6QAyb0nVEzcY4mSbl0fA2Tbki5ZH08VbYfyYxU2BQ3q\ntwYsHdzULp5yG4Ze75WxsiV8pGQi//2az1pZP274gV0wM6bxXr9jbOTccO0WjfRC\n1BuPobR1VX6rEF+6FdTbiMc=\n-----END PRIVATE KEY-----\n`;

  try {
    const doc = new GoogleSpreadsheet(SHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle["FieldUpdater"];
    const events = req.body.events || [];
    for (const ev of events) {
      await sheet.addRow({
        key: ev.subscriber.email + "|" + ev.campaign.name,
        email: ev.subscriber.email,
        campaign: ev.campaign.name,
        date: new Date().toISOString(),
        status: "Bekliyor",
      });
    }
  } catch (err) {
    // Hata olursa geç
  }
}
