import AllSales from "../../components/AllSales";

const AllSalesContainer = ({ actions }) => {
  return (
    <>
      <ul className="flex flex-row justify-between">
        {actions.map((action, index) => (
          <AllSales action={action} key={index} />
        ))}
      </ul>
    </>
  );
};

export default AllSalesContainer;
