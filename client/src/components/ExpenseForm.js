import {useState} from "react";
import {useAddExpense} from "../graphql/hooks";


function ExpenseForm() {
    const [amount, setAmount] = useState('');
    const [unit, setUnit] = useState('USD');
    const [description, setDescription] = useState('');
    const {addExpense} = useAddExpense();
    const handleSubmit = async (event) => {
        event.preventDefault();
        await addExpense({amount, unit, description});
        window.location.reload();
    };
    return (
        <section className="section">
            <div className="container">
                <h1 className="title">
                    Expense
                </h1>
                <div className="box">
                    <form>
                        <div className="field">
                            <label className="label">
                                Amount
                            </label>
                            <div className="control">
                                <input className="input" type="float" required value={amount}
                                       onChange={(event) => setAmount(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">
                                Description
                            </label>
                            <div className="control">
                                <input className="input" type="text" required value={description}
                                       onChange={(event) => setDescription(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">
                                Unit
                            </label>
                            <div className="control">
                                <input className="input" type="text" required value={unit}
                                       onChange={(event) => setUnit(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button className="button is-link" onClick={handleSubmit}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ExpenseForm;