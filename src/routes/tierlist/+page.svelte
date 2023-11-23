<script>
  import "../style.css";
  import Board from "../../components/Board.svelte";
  let board = [
    {
      id: 1,
      name: "Zod",
      items: [
        { id: "0-1", name: "item1" },
        { id: "0-2", name: "item2" },
      ],
    },
    {
      id: 2,
      name: "Good",
      items: [{ id: "1-1", name: "item1" }],
    },
    {
      id: 3,
      name: "Mediocre",
      items: [{ id: "2-1", name: "item1" }],
    },
    {
      id: 4,
      name: "Terrible",
      items: [{ id: "3-1", name: "item1" }],
    },
  ];

  const addTier = () => {
    board = [...board, { id: board.length + 1, name: "", items: [] }];
  };
  const addItem = () => {
    let targetTier = board.find((tier) => tier.items.length == 0);
    if (targetTier) {
      targetTier.items = [
        ...targetTier.items,
        {
          id: `${board.indexOf(targetTier)} - ${targetTier.items.length + 1}`,
          name: "",
        },
      ];
    } else {
      let topList = board[0];
      topList.items = [
        ...topList.items,
        {
          id: `0 - ${topList.items.length + 1}`,
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
