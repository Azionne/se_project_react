import "../blocks/Itemcard.css"; // Correctly import the CSS file

function ItemCard({ item }) {
  return (
    <li className="card">
      <h2>{item.name}</h2>
      <img className="card__image" src={item.link} alt={item.name} />
    </li>
  );
}

export default ItemCard;
