<script>
  import { flip } from "svelte/animate";
  import { initBoard } from "$lib/store";
  export let columnItems;

  const flipDuration = 300;

  const handleInput = (e, cid, itemId) => {
    if (e.key == "Delete") {
      deleteItem(cid, itemId);
      return;
    }
    const colIdx = columnItems.findIndex((c) => c.id === cid);
    const item = columnItems[colIdx].items.find((item) => item.id == itemId);
    item.name = e.target.value;
  };

  function deleteItem(cid, itemId) {
    const colIdx = columnItems.findIndex((c) => c.id === cid);
    const items = columnItems[colIdx].items.filter((item) => item.id != itemId);
    columnItems[colIdx].items = items;
    columnItems = columnItems;
  }

  function handleDragStart(e, colId, itemId) {
    e.dataTransfer.setData("text/plain", JSON.stringify({ colId, itemId }));
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e, toColId) {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    const { colId, itemId } = data;

    const fromColIdx = columnItems.findIndex((c) => c.id === colId);
    const toColIdx = columnItems.findIndex((c) => c.id === toColId);

    const item = columnItems[fromColIdx].items.find(
      (item) => item.id == itemId
    );

    columnItems[fromColIdx].items = columnItems[fromColIdx].items.filter(
      (i) => i.id !== itemId
    );

    columnItems[toColIdx].items.push(item);
    columnItems = columnItems;
    e.target.style.border = "";
  }

  const entry = (e) => {
    e.target.style.border = "3px solid white";
  };

  const exit = (e) => {
    e.target.style.border = "";
  };
</script>

<section class="board">
  {#each columnItems as column (column.id)}
    <div class="column" animate:flip={{ duration: flipDuration }}>
      <div class="column-title">
        <input
          type="text"
          value={column.name}
          style="background-color: {column.colour};"
          on:keydown={(e) => {
            if (e.key == "Delete") {
              columnItems = columnItems.filter((col) => col.id != column.id);
              initBoard.set(columnItems);
            }
          }}
        />
      </div>
      <div
        class="column-content"
        on:dragover={(e) => handleDragOver(e)}
        on:drop={(e) => handleDrop(e, column.id)}
        on:dragenter={(e) => entry(e)}
        on:dragleave={(e) => exit(e)}
      >
        {#each column.items as item (item.id)}
          <input
            type="text"
            class="card"
            draggable="true"
            placeholder="Enter name"
            animate:flip={{ duration: flipDuration }}
            on:dragstart={(e) => handleDragStart(e, column.id, item.id)}
            on:keydown={(e) => handleInput(e, column.id, item.id)}
            value={item.name}
          />
        {/each}
      </div>
    </div>
  {/each}
</section>

<style>
  .board {
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding: 0rem 2.5rem;
  }
  .column {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #333333;
  }
  .column-content {
    width: 100%;
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    background-color: rgb(32, 32, 57);
    flex-wrap: wrap;
  }

  .column-title input {
    height: 98%;
    width: 9rem;
    overflow-wrap: normal;
    padding: 0 0.5rem;
    border-radius: 7px;
    background-color: rgb(32, 32, 57);
    color: white;
    text-align: center;
    border: 1px solid black;
    font-size: 1rem;
  }

  .card {
    height: 5rem;
    width: 11rem;
    padding: 0.5rem 1rem;
    text-align: center;
    background-color: #dddddd;
    border-radius: 7px;
    color: black;
    overflow-x: scroll;
    font-size: 1rem;
  }

  * {
    transition: all 0.1s ease-in;
  }
</style>
