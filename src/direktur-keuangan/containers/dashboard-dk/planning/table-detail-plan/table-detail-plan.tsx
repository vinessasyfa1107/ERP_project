import { createSignal, type Component, onMount } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './table-planning.css';
import { Icon } from '@iconify-icon/solid';
import Form_approve from '../form_approve/form_approve';
import { dataplanning } from '../../../../../api/planning/dataplanning';

const TableDetailPlan: Component = () => {
  const [RowData, setRowData] = createSignal([]);
  const [popUpOpen, setPopUpOpen] = createSignal(false);
  const [popupData, setPopupData] = createSignal(null);

  onMount(async () => {
    const data_planning = await dataplanning("data planning dashboard dan modul pengajuan");
    console.log("dataplanning", data_planning);
    setRowData(data_planning);
  }
  )

  function ForPopup(data) {
    // Ekstrak data dari RowData di sini dan kembalikan sebagai objek
    return {
      id: data.id,
      entry_ts: data.entry_ts,
      description: data.description,
      planningtype: data.planningtype,
      category: data.category,
      amount: data.amount
      // Tambahkan field lain yang Anda butuhkan
    };
  }

  const updateStatus = async (id) => {
    if (id()) {
      try {
        const response = await fetch(`/api/planning/${id()}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id(),
          }),
        });

        if (response.ok) {
          // Data berhasil diubah, tampilkan alert
          alert('Data berhasil diubah');
          setPopUpOpen(false); // Close the popup
        } else {
          // Gagal mengubah data, tampilkan pesan kesalahan dari respons
          const errorMessage = await response.text();
          alert(`Gagal mengubah data. Pesan kesalahan: ${errorMessage}`);
          console.error('Gagal mengubah data:', errorMessage);
        }
      } catch (error) {
        // Terjadi kesalahan jaringan atau kesalahan lainnya, tampilkan alert dengan pesan kesalahan
        alert('Terjadi kesalahan. Silakan coba lagi.');
        console.error('Terjadi kesalahan:', error);
      }
    }
  };

  const handlePopUpApproved = (data) => {
    if (data.status === 'Waiting') {
      setPopupData(data);
      setPopUpOpen(true);
    }
  };

  const ClosePopUp = () => {
    setPopUpOpen(false);
  };

  const confirmCellRenderer = (params: { data: any }) => {
    let check = null;

    if (params.data.status === 'InProgress') {
      check = <Icon icon="ic:round-square" class="icon-disabled" width="21" height="21" />;
    } else if (params.data.status === 'Approved') {
      check = <button class="btn-approved" onClick={handlePopUpApproved}><Icon icon="icomoon-free:checkbox-checked" color="#7bc582" width="16.1" height="16.1" /></button>;
    } else if (params.data.status === 'Rejected') {
      check = <Icon icon="mdi:close-box" class="icon-rejected" width="21.5" height="21.5" />;
    } else if (params.data.status === 'Waiting') {
      check = <Icon icon="ic:round-square" class="icon-disabled" width="21" height="21" />;
    }

    return check;
  };

  const columnDefs = [
    { field: 'id', headerName: 'ID' },
    { field: 'entry_ts', headerName: 'Tanggal' },
    { field: 'coa_kd', headerName: 'COA' },
    { field: 'description', headerName: 'Keterangan' },
    { field: 'planningtype', headerName: 'Kategori' },
    { field: 'category', headerName: 'Jenis' },
    { field: 'amount', headerName: 'Jumlah' },
    { field: 'status', headerName: 'Status' },
    { field: 'confirm', headerName: 'Konfirmasi', cellRenderer: confirmCellRenderer }

  ];

  const defaultColDef = {
    flex: 1,
    sortable: true,
  }

  const gridOptions = {
    // domLayout: 'autoHeight' as DomLayoutType,
    pagination: true,
    paginationPageSize: 4,
    rowHeight: 40
  }



  return (
    <div>
      <div class="ag-theme-alpine" style={{ width: '140vh', height: '21vw' }}>
        <AgGridSolid
          columnDefs={columnDefs}
          rowData={RowData()}
          defaultColDef={defaultColDef}
          gridOptions={gridOptions}
          onRowClicked={(event) => handlePopUpApproved(event.data)}
        />
        {popUpOpen() && <Form_approve data={popupData()} OnClose={ClosePopUp} updateStatus={updateStatus} />}
      </div>
    </div>
  );
};

export default TableDetailPlan;
