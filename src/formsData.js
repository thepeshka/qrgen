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
    name: "Text",
    fields: [
      {
        type: "textArea",
        title: "Text",
        id: "text"
      }
    ],
    renderer: ({text}) => text
  },
  email: {
    name: "Email",
    fields: [
      {
        type: "array",
        title: "To",
        id: "to",
        filterType: "email"
      },
      {
        type: "array",
        title: "Cc",
        id: "cc",
        filterType: "email"
      },
      {
        type: "array",
        title: "Bcc",
        id: "bcc",
        filterType: "email"
      },
      {
        type: "text",
        title: "Subject",
        id: "subject",
      },
      {
        type: "textArea",
        title: "Body",
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
    name: "Phone",
    fields: [
      {
        id: "phone",
        type: "phone",
        title: "Number"
      }
    ],
    renderer: ({phone}) => `tel:+${phone}`
  },
  wifi: {
    name: "Wi-Fi",
    fields: [
      {
        id: "auth",
        type: "choices",
        title: "Authentication",
        choices: [
          {value: "nopass", caption: "None"},
          {value: "WEP", caption: "WEP"},
          {value: "WPA", caption: "WPA"},
          {value: "WPA2", caption: "WPA2"},
          {value: "WPA2-EAP", caption: "WPA2-EAP"}
        ]
      },
      {
        id: "ssid",
        type: "text",
        title: "SSID (network name)"
      },
      {
        id: "password",
        type: "password",
        title: "Password",
        showIf: ({auth}) => auth !== "nopass"
      },
      {
        id: "eapMethod",
        type: "choices",
        title: "EAP method",
        choices: [
          {value: "PWD", caption: "PWD"},
          {value: "TTLS", caption: "TTLS"}
        ],
        showIf: ({auth}) => auth === "WPA2-EAP"
      },
      {
        id: "identity",
        type: "text",
        title: "Identity",
        showIf: ({auth}) => auth === "WPA2-EAP"
      },
      {
        id: "anonIdentity",
        type: "text",
        title: "Anonymous identity",
        showIf: ({auth, eapMethod}) => auth === "WPA2-EAP" && eapMethod === "TTLS"
      },
      {
        id: "phase2",
        type: "choices",
        title: "Phase 2 method",
        choices: [
          {value: "PAP", caption: "PAP"},
          {value: "MSCHAP", caption: "MSCHAP"},
          {value: "MSCHAPV2", caption: "MSCHAPV2"},
          {value: "GTC", caption: "GTC"},
        ],
        showIf: ({auth, eapMethod}) => auth === "WPA2-EAP" && eapMethod === "TTLS"
      },
      {
        id: "hidden",
        type: "boolean",
        title: "Hidden"
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
  custom: {
    name: "Custom protocol",
    fields: [
      {
        type: "text",
        title: "Protocol",
        id: "proto",
      },
      {
        type: "text",
        title: "Path",
        id: "path",
      },
      {
        type: "array",
        title: "Arguments",
        id: "args"
      }
    ],
    renderer: ({proto, path, args}) => encodeURI(`${proto}:${path}?${args.join()}`)
  },
}

export default FormsData;
