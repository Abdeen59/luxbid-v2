// Pi Network SDK

let piUser = null;

async function initPi() {
  try {
    Pi.init({
      version: "2.0",
      sandbox: CONFIG.PI_SANDBOX
    });

    console.log("✅ Pi SDK Initialized");

  } catch (err) {
    console.error("Pi Init Error:", err);
  }
}

async function loginPi() {
  try {
    const auth = await Pi.authenticate(
      ["username", "payments"],
      () => {}
    );

    piUser = auth.user;

    console.log("Logged in:", piUser);

    const sb = await initSupabase();

    const { error } = await sb
      .from("users")
      .upsert(
        {
          id: piUser.uid,
          username: piUser.username
        },
        {
          onConflict: "id"
        }
      );

    if (error) {
      alert(error.message);
      return;
    }

    alert("مرحباً " + piUser.username);

  } catch (err) {
    console.error(err);
    alert("فشل تسجيل الدخول");
  }
}
