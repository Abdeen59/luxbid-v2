document.addEventListener("DOMContentLoaded", async () => {
  try {
    // تهيئة Supabase
    const sb = await initSupabase();

    // تهيئة Pi SDK
    await initPi();

    // تحميل المنتجات
    await loadFeaturedItems(sb);

  } catch (err) {
    console.error(err);
  }
});

async function loadFeaturedItems(sb) {

  const { data, error } = await sb
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const container = document.getElementById("featuredItems");

  if (!container) return;

  container.innerHTML = "";

  if (!data || data.length === 0) {
    container.innerHTML =
      "<div class='col-12 text-center'><h4>لا توجد مزادات حالياً</h4></div>";
    return;
  }

  data.forEach(item => {

    container.innerHTML += `
      <div class="col-md-4 mb-4">

        <div class="card h-100">

          <img src="${item.image_url || 'https://placehold.co/600x400'}" class="card-img-top">

          <div class="card-body">

            <h5>${item.name}</h5>

            <p>${item.category || ""}</p>

            <div class="price">
              ${item.current_price} π
            </div>

          </div>

        </div>

      </div>
    `;

  });

}
