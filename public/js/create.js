const storeForm = document.getElementById("store-form");
const storeId = document.getElementById("store-id");
const storeAddress = document.getElementById("store-address");

// Create POST request to api to create store

async function addStore(e) {
  e.preventDefault();
  if (storeId.value === "" || storeAddress.value === "") {
    alert("Please fill in fields");
  }

  const dataBody = {
    storeId: storeId.value,
    address: storeAddress.value
  };

  try {
    const res = await fetch("/api/v1/stores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataBody)
    });

    if (res.status === 400) {
      throw Error("Store already exists!");
    }

    alert("New store was added successfully!");

    window.location.href = "/index.html";
  } catch (err) {
    alert(err);
    return;
  }
}

storeForm.addEventListener("submit", addStore);
