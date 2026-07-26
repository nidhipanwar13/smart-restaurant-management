import MenuCard from "./MenuCard";

function MenuList({ menuItems, setSelectedMenu }) {
  return (
    <div className="row">
      {menuItems.map((menu) => (
        <MenuCard
          key={menu._id}
          menu={menu}
          setSelectedMenu={setSelectedMenu}
        />
      ))}
    </div>
  );
}

export default MenuList;