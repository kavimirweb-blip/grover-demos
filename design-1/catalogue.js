/* Shared sample catalogue and drop-down menu for the Grover Garments mockups (placeholder data). */
window.GG = (function () {
  const menu = {
    Men: [
      { g: "Shirts", subs: ["Casual shirts", "Formal shirts"] },
      { g: "T-shirts", subs: ["Round neck t-shirts", "Polo t-shirts", "Colour t-shirts"] },
      { g: "Jeans", subs: ["Denim jeans", "Black jeans"] },
      { g: "Trousers", subs: ["Formal trousers", "Cargo trousers"] },
      { g: "Ethnic wear", subs: ["Kurta sets", "Nehru jackets"] }
    ],
    Women: [
      { g: "Ethnic wear", subs: ["Kurtis", "Suits", "Palazzo sets"] },
      { g: "Western wear", subs: ["Co-ord sets", "Casual tops", "Dresses"] },
      { g: "Jeans and bottoms", subs: ["Jeans", "Leggings"] }
    ],
    Kids: [
      { g: "Boys", subs: ["Kurta sets", "T-shirts", "Denim sets"] },
      { g: "Girls", subs: ["Frocks", "Lehengas", "Co-ord sets"] }
    ]
  };

  // name, category, group, sub-category, icon, colour tone, price, old price, tag
  const rows = [
    ["Casual Check Shirt", "Men", "Shirts", "Casual shirts", "shirt", 1, "₹799", "", "New"],
    ["Printed Half-Sleeve Shirt", "Men", "Shirts", "Casual shirts", "shirt", 4, "₹699", "₹899", "Offer"],
    ["Formal Cotton Shirt", "Men", "Shirts", "Formal shirts", "shirt", 2, "₹999", "", ""],
    ["Round Neck T-Shirt", "Men", "T-shirts", "Round neck t-shirts", "shirt", 0, "₹449", "", ""],
    ["Polo T-Shirt", "Men", "T-shirts", "Polo t-shirts", "shirt", 2, "₹599", "₹799", "Offer"],
    ["Colour Block T-Shirt", "Men", "T-shirts", "Colour t-shirts", "shirt", 3, "₹549", "", "New"],
    ["Blue Denim Jeans", "Men", "Jeans", "Denim jeans", "shirt", 2, "₹1,199", "₹1,499", "Offer"],
    ["Black Slim Fit Jeans", "Men", "Jeans", "Black jeans", "shirt", 0, "₹1,299", "", ""],
    ["Formal Trousers", "Men", "Trousers", "Formal trousers", "shirt", 5, "₹999", "", ""],
    ["Cargo Trousers", "Men", "Trousers", "Cargo trousers", "shirt", 1, "₹1,099", "", "New"],
    ["Kurta Pyjama Set", "Men", "Ethnic wear", "Kurta sets", "kurta", 0, "₹1,499", "₹1,999", "Festive"],
    ["Nehru Jacket Set", "Men", "Ethnic wear", "Nehru jackets", "kurta", 3, "₹2,499", "", "Festive"],
    ["Printed Kurti", "Women", "Ethnic wear", "Kurtis", "kurta", 1, "₹899", "", "New"],
    ["Anarkali Suit", "Women", "Ethnic wear", "Suits", "frock", 5, "₹2,799", "", "Festive"],
    ["Palazzo Set", "Women", "Ethnic wear", "Palazzo sets", "kurta", 4, "₹1,299", "", ""],
    ["Co-ord Set", "Women", "Western wear", "Co-ord sets", "kurta", 2, "₹1,699", "₹2,199", "Offer"],
    ["Casual Top", "Women", "Western wear", "Casual tops", "shirt", 3, "₹499", "", "New"],
    ["Floral Midi Dress", "Women", "Western wear", "Dresses", "frock", 1, "₹1,399", "", ""],
    ["Women's Denim Jeans", "Women", "Jeans and bottoms", "Jeans", "shirt", 2, "₹1,099", "", ""],
    ["Stretch Leggings", "Women", "Jeans and bottoms", "Leggings", "shirt", 0, "₹349", "", "Offer"],
    ["Boys Kurta Set", "Kids", "Boys", "Kurta sets", "kurta", 0, "₹999", "₹1,299", "Offer"],
    ["Boys Printed T-Shirt", "Kids", "Boys", "T-shirts", "shirt", 3, "₹399", "", ""],
    ["Boys Denim Set", "Kids", "Boys", "Denim sets", "shirt", 2, "₹899", "₹1,099", ""],
    ["Girls Party Frock", "Kids", "Girls", "Frocks", "frock", 1, "₹1,199", "", "New"],
    ["Girls Lehenga", "Kids", "Girls", "Lehengas", "frock", 4, "₹1,799", "", "Festive"],
    ["Kids Co-ord Set", "Kids", "Girls", "Co-ord sets", "shirt", 3, "₹749", "", "Offer"]
  ];
  const products = rows.map((r) => ({ name: r[0], cat: r[1], group: r[2], sub: r[3], icon: r[4], tone: r[5], price: r[6], old: r[7], tag: r[8] }));

  function filter(st, query) {
    const t = (query || "").trim().toLowerCase();
    return products.filter((p) => {
      if (st.cat === "Offers") { if (!(p.tag === "Offer" || p.old)) return false; }
      else if (st.cat !== "All" && p.cat !== st.cat) return false;
      if (st.group && p.group !== st.group) return false;
      if (st.sub && p.sub !== st.sub) return false;
      return !t || (p.name + " " + p.cat + " " + p.group + " " + p.sub).toLowerCase().includes(t);
    });
  }

  function crumb(st) {
    if (!st.cat || st.cat === "All") return [];
    return [st.cat, st.group, st.sub].filter(Boolean);
  }

  function initMega(o) {
    const items = [...o.nav.querySelectorAll("[data-top]")];
    let cur = null;
    const hoverOk = () => window.matchMedia("(hover:hover)").matches;
    function html(top) {
      return '<div class="mg-wrap"><div class="mg-cols">' +
        menu[top].map((g) =>
          '<div class="mg-col"><a class="mg-h" href="#shop" data-g="' + g.g + '">' + g.g + "</a>" +
          g.subs.map((s) => '<a class="mg-i" href="#shop" data-g="' + g.g + '" data-s="' + s + '">' + s + "</a>").join("") +
          "</div>").join("") +
        '</div><a class="mg-view" href="#shop">View all ' + top + "</a></div>";
    }
    function open(top) {
      cur = top; o.panel.innerHTML = html(top); o.panel.hidden = false;
      items.forEach((i) => i.classList.toggle("on", i.dataset.top === top));
    }
    function close() { cur = null; o.panel.hidden = true; items.forEach((i) => i.classList.remove("on")); }
    items.forEach((i) => {
      i.addEventListener("mouseenter", () => { if (hoverOk()) open(i.dataset.top); });
      i.addEventListener("click", (e) => { e.preventDefault(); cur === i.dataset.top ? close() : open(i.dataset.top); });
    });
    o.header.addEventListener("mouseleave", () => { if (hoverOk()) close(); });
    o.panel.addEventListener("click", (e) => {
      const a = e.target.closest("a"); if (!a) return;
      e.preventDefault(); const top = cur; close();
      o.onSelect({ cat: top, group: a.dataset.g || "", sub: a.dataset.s || "" });
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    document.addEventListener("click", (e) => { if (!o.header.contains(e.target)) close(); });
    if (location.hash === "#menu-men") open("Men");
    if (location.hash === "#menu-women") open("Women");
  }

  return { menu, products, filter, crumb, initMega };
})();
