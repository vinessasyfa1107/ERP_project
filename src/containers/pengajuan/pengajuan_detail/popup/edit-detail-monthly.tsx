import type { Component } from 'solid-js';
import { render } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './edit-monthly-plan.css';

interface EditMonthlyPlanProps {
    OnClose: () => void;
    data: {
        pengajuan_id: number,
        namapengajuan: string,
        keterangan: string,
        kebutuhan: string,
        coa_kd: string,
        quantity: number,
        uom: string,
        price: number,
        total: number
    }
}

const EditMonthlyPlan: Component<EditMonthlyPlanProps> = (props) => {

    const [id, setId] = createSignal(props.data.pengajuan_id);
    const [namaPengajuan, setNamaPengajuan] = createSignal(props.data.namapengajuan);
    const [keterangan, setKeterangan] = createSignal(props.data.keterangan);
    const [kebutuhan, setKebutuhan] = createSignal(props.data.kebutuhan);
    const [coaKd, setCoaKd] = createSignal(props.data.coa_kd);
    const [quantity, setQuantity] = createSignal(props.data.quantity);
    const [uom, setUom] = createSignal(props.data.uom);
    const [price, setPrice] = createSignal(props.data.price);
    const [total, setTotal] = createSignal(props.data.total);

    console.log("tes", id())

    return (
        <div class="overlay">
            <div class="edit-monthly-plan">
                <div class="form-edit">
                    <form method="dialog">
                        <div class="head-acc">
                            <h2>Edit Data Pengajuan</h2>
                            <button onClick={props.OnClose}>✕</button>
                        </div>

                        <div class="form-pengajuan">
                            <p>
                                <label>Kebutuhan*</label>
                                <br />
                                <input
                                    type="text"
                                    name="kebutuhan"
                                    value={kebutuhan()}
                                    onInput={(e) => setKebutuhan(e.currentTarget.value)}
                                />
                            </p>

                            <p>
                                <label>COA*</label>
                                <br />
                                <input
                                    type="text"
                                    name="coaKd"
                                    value={coaKd()}
                                    onInput={(e) => setCoaKd(e.currentTarget.value)}
                                />
                            </p>

                            <p>
                                <label>Qty*</label>
                                <br />
                                <input
                                    type="number"
                                    name="quantity"
                                    value={quantity()}
                                    onInput={(e) => setQuantity(parseFloat(e.currentTarget.value))}
                                />
                            </p>

                            <p>
                                <label>Unit*</label>
                                <br />
                                <input
                                    type="text"
                                    name="uom"
                                    value={uom()}
                                    onInput={(e) => setUom(e.currentTarget.value)}
                                />
                            </p>

                            <p>
                                <label>Price*</label>
                                <br />
                                <input
                                    type="number"
                                    name="price"
                                    value={price()}
                                    onInput={(e) => setPrice(parseFloat(e.currentTarget.value))}
                                />
                            </p>
                        </div>

                        <br />
                        <div class="btn-save-edit">
                            <button ><Icon icon="ph:paper-plane-tilt-fill" color="white" width="30" height="30" /></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditMonthlyPlan;
