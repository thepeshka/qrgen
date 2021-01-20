import Lang from './lang';

const escapeQr = (txt, chars = '\\;,:') => {
  Array.from(chars).forEach(c => txt.replace(c, '\\' + c));
  return txt;
}

const protoUrl = (proto, path, args) => {
  args = Object.entries(args).map(([name, val]) => `${name}=${val}`).join("&");
  return encodeURI(`${proto}:${path}?${args}`);
}

const FormsData = {
  text: {
    name: Lang["text.name"],
    fields: [
      {
        type: "textArea",
        title: Lang["text.text.title"],
        id: "text"
      }
    ],
    renderer: ({text}) => text
  },
  email: {
    name: Lang["email.name"],
    fields: [
      {
        type: "array",
        title: Lang["email.to.title"],
        id: "to",
        filterType: "email"
      },
      {
        type: "array",
        title: Lang["email.cc.title"],
        id: "cc",
        filterType: "email"
      },
      {
        type: "array",
        title: Lang["email.bcc.title"],
        id: "bcc",
        filterType: "email"
      },
      {
        type: "text",
        title: Lang["email.subject.title"],
        id: "subject",
      },
      {
        type: "textArea",
        title: Lang["email.body.title"],
        id: "body"
      },
    ],
    renderer: ({to, cc, bcc, subject, body}) => protoUrl(
      'mailto',
      to.join(','),
      {
        cc: cc.join(','),
        bcc: bcc.join(','),
        subject,
        body
      }
    )
  },
  phone: {
    name: Lang["phone.name"],
    fields: [
      {
        id: "phone",
        type: "text",
        title: Lang["phone.phone.title"]
      }
    ],
    renderer: ({phone}) => `tel:+${phone}`
  },
  wifi: {
    name: Lang["wifi.name"],
    fields: [
      {
        id: "auth",
        type: "choices",
        title: Lang["wifi.auth.title"],
        choices: [
          {value: "nopass", caption: Lang["wifi.auth.choices.nopass.caption"]},
          {value: "WEP", caption: Lang["wifi.auth.choices.WEP.caption"]},
          {value: "WPA", caption: Lang["wifi.auth.choices.WPA.caption"]},
          {value: "WPA2", caption: Lang["wifi.auth.choices.WPA2.caption"]},
          {value: "WPA2-EAP", caption: Lang["wifi.auth.choices.WPA2-EAP.caption"]}
        ]
      },
      {
        id: "ssid",
        type: "text",
        title: Lang["wifi.ssid.title"]
      },
      {
        id: "password",
        type: "password",
        title: Lang["wifi.password.title"],
        showIf: ({auth}) => auth !== "nopass"
      },
      {
        id: "eapMethod",
        type: "choices",
        title: Lang["wifi.eapMethod.title"],
        choices: [
          {value: "PWD", caption: Lang["wifi.eapMethod.choices.PWD.caption"]},
          {value: "TTLS", caption: Lang["wifi.eapMethod.choices.TTLS.caption"]}
        ],
        showIf: ({auth}) => auth === "WPA2-EAP"
      },
      {
        id: "identity",
        type: "text",
        title: Lang["wifi.identity.title"],
        showIf: ({auth}) => auth === "WPA2-EAP"
      },
      {
        id: "anonIdentity",
        type: "text",
        title: Lang["wifi.anonIdentity.title"],
        showIf: ({auth, eapMethod}) => auth === "WPA2-EAP" && eapMethod === "TTLS"
      },
      {
        id: "phase2",
        type: "choices",
        title: Lang["wifi.phase2.title"],
        choices: [
          {value: "PAP", caption: Lang["wifi.phase2.choices.PAP.caption"]},
          {value: "MSCHAP", caption: Lang["wifi.phase2.choices.MSCHAP.caption"]},
          {value: "MSCHAPV2", caption: Lang["wifi.phase2.choices.MSCHAPV2.caption"]},
          {value: "GTC", caption: Lang["wifi.phase2.choices.GTC.caption"]},
        ],
        showIf: ({auth, eapMethod}) => auth === "WPA2-EAP" && eapMethod === "TTLS"
      },
      {
        id: "hidden",
        type: "boolean",
        title: Lang["wifi.hidden.title"]
      },
    ],
    renderer: ({ssid, auth, password, hidden, eapMethod, anonIdentity, identity, phase2}) => {
      ssid = escapeQr(ssid);
      hidden = hidden ? "H:true;" : "";
      if (auth === "nopass")
        return `WIFI:T:nopadd;S:${ssid};${hidden};`;

      password = `P:${escapeQr(password)}`;
      if (auth !== "WPA2-EAP")
        return `WIFI:T:${auth};S:${ssid};${password}${hidden};`;

      anonIdentity = (eapMethod === "TTLS" && anonIdentity) ? `A:${escapeQr(anonIdentity)};` : '';
      identity = identity ? `I:${escapeQr(identity)};` : '';
      phase2 = (eapMethod === "TTLS" && phase2) ? `PH2:${phase2};` : '';
      eapMethod = eapMethod ? `E:${eapMethod};` : '';

      return `WIFI:T:${auth};S:${ssid};${password}${eapMethod}${anonIdentity}${identity}${phase2}${hidden};`;
    }
  },
  vcard: {
    name: Lang["vcard.name"],
    fields: [
      {
        id: "name",
        type: "text",
        title: Lang["vcard.name.title"]
      },
      {
        id: "fname",
        type: "text",
        title: Lang["vcard.fname.title"]
      },
      {
        id: "org",
        type: "text",
        title: Lang["vcard.org.title"]
      },
      {
        id: "email",
        type: "text",
        title: Lang["vcard.email.title"]
      },
      {
        id: "url",
        type: "text",
        title: Lang["vcard.url.title"]
      },
      {
        id: "cell",
        type: "text",
        title: Lang["vcard.cell.title"]
      },
      {
        id: "phone",
        type: "text",
        title: Lang["vcard.phone.title"]
      },
      {
        id: "fax",
        type: "text",
        title: Lang["vcard.fax.title"]
      },
      {
        id: "street",
        type: "text",
        title: Lang["vcard.street.title"]
      },
      {
        id: "city",
        type: "text",
        title: Lang["vcard.city.title"]
      },
      {
        id: "region",
        type: "text",
        title: Lang["vcard.region.title"]
      },
      {
        id: "postcode",
        type: "text",
        title: Lang["vcard.postcode.title"]
      },
      {
        id: "country",
        type: "text",
        title: Lang["vcard.country.title"]
      },
    ],
    renderer: ({name, fname, org, email, url, cell, phone, fax, street, city, region, postcode, country}) => {
      name = name.length || fname.length ? `N:${name};${fname}\n` : '';
      org = org.length ? `ORG:${org}\n` : '';
      email = email.length ? `EMAIL;TYPE=INTERNET:${email}\n` : '';
      url = url.length ? `URL:${url}\n` : '';
      cell = cell.length ? `TEL;TYPE=CELL:${cell}\n` : '';
      phone = phone.length ? `TEL:${phone}\n` : '';
      fax = fax.length ? `TEL;TYPE=FAX:${fax}\n` : '';
      const adr = street.length || city.length || region.length || postcode.length || country.length
        ? `ADR:;;${street};${city};${region};${postcode};${country}\n` :'';
      return `BEGIN:VCARD\nVERSION:3.0\n${name}${org}${email}${url}${cell}${phone}${fax}${adr};END:VCARD`;
    }
  },
  custom: {
    name: Lang["custom.name"],
    fields: [
      {
        type: "text",
        title: Lang["custom.proto.title"],
        id: "proto",
      },
      {
        type: "text",
        title: Lang["custom.path.title"],
        id: "path",
      },
      {
        type: "array",
        title: Lang["custom.args.title"],
        id: "args"
      }
    ],
    renderer: ({proto, path, args}) => encodeURI(`${proto}:${path}?${args.join()}`)
  },
}

export default FormsData;
