export function autoReadSMS(cb) {
  // used AbortController with setTimeout so that WebOTP API (Autoread sms) will get disabled after 1min
  alert(0);
  const signal = new AbortController();
  setTimeout(() => {
    signal.abort();
  }, 2 * 60 * 1000);
  async function main() {
    if ("OTPCredential" in window) {
      alert(1);
      try {
        alert(2);
        if (navigator.credentials) {
          alert(3);
          try {
            alert(4);
            await navigator.credentials
              .get({ abort: signal, otp: { transport: ["sms"] } })
              .then((content) => {
                if (content && content.code) {
                  alert(content.code);
                  cb(content.code);
                }
              })
              .catch((e) => console.log(e))
              .finally((ex) => {
                if (ex?.message) {
                  alert(ex?.message);
                } else {
                  alert(5);
                }
              });
          } catch (e) {
            return;
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert(6);
    }
  }
  main();
}
