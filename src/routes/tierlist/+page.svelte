<script>
  import "../style.css";
  import Board from "../../components/Board.svelte";
  import { initBoard, listTitle } from "$lib/store";
  import { onDestroy } from "svelte";
  import "crypto";

  const colours = [
    "rgb(139, 23, 212)",
    "rgb(214, 217, 46)",
    "rgb(222, 122, 9)",
    "rgb(28, 164, 28)",
    "rgb(57, 137, 223)",
    "rgb(194, 48, 199)",
  ];

  let board = [];

  let title = "";

  const unsub1 = listTitle.subscribe((name) => (title = name));
  const unsub2 = initBoard.subscribe((init) => (board = init));

  const addTier = () => {
    const adjacentColour = board[board.length - 1].colour;
    const newColour = colours.filter((colour) => colour != adjacentColour)[
      Math.floor(Math.random() * 5)
    ];
    const uid = crypto.randomUUID();
    board = [
      ...board,
      {
        id: board.length,
        name: "New Tier",
        colour: newColour,
        items: [
          {
            id: uid,
            name: "",
          },
        ],
      },
    ];
  };

  const addItem = () => {
    let targetTier = board.find((tier) => tier.items.length == 0);
    const uid = crypto.randomUUID();
    if (targetTier) {
      targetTier.items = [
        ...targetTier.items,
        {
          id: uid,
          name: "",
        },
      ];
    } else {
      let topList = board[0];
      topList.items = [
        ...topList.items,
        {
          id: uid,
          name: "",
        },
      ];
    }
    board = board;
  };

  onDestroy(() => {
    unsub1(), unsub2();
  });
</script>

<main>
  <h1>TierList Maker</h1>
  <a href="/"><button class="back">Back</button></a>
  <div class="buttons">
    <button on:click={addTier}>Add Tier</button>
    <button on:click={addItem}>Add Item</button>
  </div>
  <input
    type="text"
    placeholder="Enter List Name"
    bind:value={title}
    on:input={(e) => listTitle.update((name) => (name = e.target.value))}
  />
</main>
<Board columnItems={board}></Board>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h1 {
    color: white;
  }

  .buttons {
    margin: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 7px;
    cursor: pointer;
  }

  .back {
    position: absolute;
    top: 2rem;
    left: 3rem;
    background-color: transparent;
    color: white;
    border: 1px solid white;
  }

  input {
    background-color: rgb(32, 32, 57);
    color: white;
    border: none;
    text-align: center;
    padding: 1rem;
    font-size: 1.5rem;
    margin: 2rem 0rem;
  }
</style>
