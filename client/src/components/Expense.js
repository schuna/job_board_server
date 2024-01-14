import {useExpenses} from '../graphql/hooks';
import DataTable from "react-data-table-component";
import ExpenseForm from "./ExpenseForm";

const columns = [
    {
        name: "ID",
        selector: row => row.id,
        sortable: true
    },
    {
        name: "Amount",
        selector: row => row.amount
    },
    {
        name: "Unit",
        selector: row => row.unit
    },
    {
        name: "Description",
        selector: row => row.description
    }
];

function Expense({user}) {
    const {expenses} = useExpenses();
    // noinspection JSValidateTypes
    return (
        <section className="section">
            <div className="container">
                <h1 className="title">
                    User Id: {user.id}
                </h1>
                <ExpenseForm/>
                <DataTable
                    title="Expense"
                    columns={columns}
                    data={expenses}
                    pagination
                    highlightOnHover
                />
            </div>
        </section>
    );
}

export default Expense;