async function deleteItem(e) {
  console.log(e.target);
  let id = e.target.id;
  await fetch("http://localhost:3001/graphql", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
      query: `mutation DeleteServiceById($id: String) { 
                deleteServiceById(id: $id)
            }`,
      variables: {
        id,
      },
    }),
  }).then((resp) => {
    console.log(resp.json());
  });

}
