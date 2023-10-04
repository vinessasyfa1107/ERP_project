import { createSignal } from 'solid-js';
import { Icon } from '@iconify-icon/solid';


function DeleteButtonRenderer(props) {
  const [gridApi] = createSignal(props.api);

  const deleteRow = () => {
    const id = props.data.id; // Ubah sesuai dengan properti identifikasi yang sesuai
    gridApi().applyTransaction({ remove: [{ id }] });
  };

  return (
    <span class="search-icon">
        <Icon icon="iconamoon:search-bold" color="#808080" width="11" height="11"/>
    </span>
    )
}

export default DeleteButtonRenderer;