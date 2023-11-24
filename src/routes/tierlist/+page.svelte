<script>
  import "../style.css";
  import Board from "../../components/Board.svelte";
  import { initBoard } from "$lib/store";
  import { onDestroy } from "svelte";

  const colours = [
    "rgb(139, 23, 212)",
    "rgb(214, 217, 46)",
    "rgb(222, 122, 9)",
    "rgb(28, 164, 28)",
    "rgb(57, 137, 223)",
    "rgb(194, 48, 199)",
  ];

  let board = [];

  const unsub = initBoard.subscribe((init) => (board = init));

  onDestroy(() => unsub());

  const addTier = () => {
    const adjacentColour = board[board.length - 1].colour;
    const newColour = colours.filter((colour) => colour != adjacentColour)[
      Math.floor(Math.random() * 5)
    ];
    board = [
      ...board,
      {
        id: board.length,
        name: "New Tier",
        colour: newColour,
        items: [
          {
            id: `${board.length}-1`,
            name: "",
          },
        ],
      },
    ];
  };

  const addItem = () => {
    let targetTier = board.find((tier) => tier.items.length == 0);
    if (targetTier) {
      targetTier.items = [
        ...targetTier.items,
        {
          id: `${board.indexOf(targetTier)}-${targetTier.items.length + 1}`,
          name: "",
        },
      ];
    } else {
      let topList = board[0];
      topList.items = [
        ...topList.items,
        {
          id: `0-${topList.items.length + 1}`,
          name: "",
        },
      ];
    }
    board = board;
  };
</script>

<main>
  <h1>TierList Maker</h1>
  <a href="/"><button class="back">Back</button></a>
  <div class="buttons">
    <button on:click={addTier}>Add Tier</button>
    <button on:click={addItem}>Add Item</button>
  </div>
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
</style>
