import MenuCard from "./MenuCard";

function MenuList({ menuItems }) {
  return (
    <div className="row">
      {menuItems.map((menu) => (
        <MenuCard
          key={menu._id}
          menu={menu}
        />
      ))}
    </div>
  );
}

export default MenuList;