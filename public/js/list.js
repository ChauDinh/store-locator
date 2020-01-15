const tableElements = document.getElementById("car-info");

async function getStoresFromAPI() {
  const res = await fetch("/api/v1/stores");
  const dataJSON = await res.json();

  dataJSON.data.map(
    store =>
      (tableElements.innerHTML += `<tr>
    <th scope="row">${store.storeId}</th>
    <td>${store.location.formattedAddress}</td>
  </tr>`)
  );
}

getStoresFromAPI();
