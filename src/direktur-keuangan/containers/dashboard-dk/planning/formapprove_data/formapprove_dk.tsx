import { onCleanup, type Component, createSignal } from 'solid-js';
import './formapprove_dk.css';
import { Icon } from '@iconify-icon/solid';

interface EditPopUpProps {
  OnClose: () => void;
  params: {
    id: number,
    entry_ts: string,
    namapengajuan: string,
    alasan: string,
    planningtype: string,
    tipepengajuan: string,
    total: number,
  };
}

const Formapprove_dk: Component<EditPopUpProps> = (props) => {
  const [status, setStatus] = createSignal('');
  const [timestamp, setTimestamp] = createSignal('');
  const [alasan, setAlasan] = createSignal('');

  const handleInputChange = async (e) => {
    const { value } = e.target;

    if (value === 'Approved') {
      if (props.params.planningtype === 'Weekly') {
        setStatus('Approved');
      } else {
        setStatus('InProgress');
      }
    } else {
      setStatus(value);
    }

    if (value === 'InProgress' || value === 'Rejected') {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 11);

      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const seconds = String(currentDate.getSeconds()).padStart(2, '0');
      const formattedTime = `${hours}:${minutes}:${seconds}`;

      const timestamp = `${formattedDate}${formattedTime}`;

      console.log("tanggal dan waktu: ", timestamp);
      setTimestamp(timestamp);
    }

    await updateStatus();
  };

  const formatRupiah = (value) => {
    const numericValue = Number(value);

    if (isNaN(numericValue)) {
      return value;
    }

    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(numericValue);
  };

  const updateStatus = async () => {
    const updateStatusToSend = {
      id: props.params.id,
      entry_ts: timestamp(),
      alasan: props.params.alasan,
      planningtype: props.params.planningtype,
      tipepengajuan: props.params.tipepengajuan,
      total: props.params.total,
      status: (props.params.planningtype === 'Weekly') ? 'Approved' : 'InProgress',
    };

    const updatePengajuan = new FormData();
    updatePengajuan.append('id', props.params.id.toString());
    updatePengajuan.append('entry_ts', timestamp().toString());
    updatePengajuan.append('namapengajuan', props.params.namapengajuan.toString());
    updatePengajuan.append('tipepengajuan', props.params.tipepengajuan.toString());
    updatePengajuan.append('total', props.params.total.toString());
    updatePengajuan.append('status', (props.params.planningtype === 'Weekly') ? 'InProgress' : 'Approved');
    updatePengajuan.append('alasan', alasan());

    console.log("test", updateStatusToSend);

    try {
      const response = await fetch(`/api/pengajuan/${(props.params.id)}`, {
        method: 'PUT',
        body: updatePengajuan,
      });

      if (response.ok) {
        alert('Data berhasil diubah');
        props.OnClose();
        window.location.reload();
      } else {
        const errorMessage = await response.text();
        alert(`Gagal mengubah data. Pesan kesalahan: ${errorMessage}`);
        console.error('Gagal mengubah data:', errorMessage);
      }
    } catch (error) {
      alert('Terjadi kesalahan. Silakan coba lagi.');
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <div class="overlay">
      <div class="form-confirm">
        <div class="modal-form">
          <form method="dialog">
            <div class="headakun">
              <h2>Pengajuan Direktur Keuangan</h2>
              <button onClick={props.OnClose}>✕</button>
            </div>

            <div class="isi-form">
              <label>Tanggal</label>
              <br />
              <input type="text" value={props.params.entry_ts} readonly />

              <br />
              <label>Nama Pengajuan</label>
              <br />
              <input type="text" value={props.params.namapengajuan} readonly />

              <p>
                <label>Alasan</label>
                <br />
                <textarea class="textarea textarea-bordered"
                  style={{
                    "background": '#F8F8F9',
                    "box-shadow": "0px 2px 4px 0px rgb(0 0 0 / 25%) inset",
                    "width": "78vh", "height": "12vh", margin: 'auto'
                  }}
                  value={alasan()}
                  onInput={(e) => setAlasan(e.currentTarget.value)}
                ></textarea>
              </p>

              <div style={{ "display": "flex", "justify-content": "space-between", "padding-right": "10px" }}>
                <div>
                  <label>Kategori</label>
                  <br />
                  <input type="text"
                    value={props.params.tipepengajuan}
                    readonly style={{ "width": "13rem" }} />
                </div>

                <p>
                  <label>Jumlah</label>
                  <br />
                  <input
                    type="text"
                    value={formatRupiah(props.params.total)}
                    readOnly
                    style={{ "width": "13rem" }}
                  />
                </p>
              </div>
            </div>

            <br />
            <br />
            <div class="btn-add-acc">
              <button value='InProgress' style={{
                "background-color": "rgba(132, 103, 255, 0.80)",
                "border-radius": "5px",
                "width": "7rem",
                "height": "2rem",
                "margin-right": "30px"
              }} onClick={handleInputChange}>Approved</button>
              <button value='Rejected' style={{
                "background-color": "#F56D59",
                "border-radius": "5px",
                "width": "7rem",
                "height": "2rem"
              }} onClick={handleInputChange}>Rejected</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formapprove_dk;
