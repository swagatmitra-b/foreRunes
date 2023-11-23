<script lang="ts">
  import "../style.css";
  import { marked } from "marked";
  let parsedText = "";

  let inputVal: string = "";

  const parseMarkdown = () => {
    const para = document.querySelector(".text") as HTMLParagraphElement;
    parsedText = marked.parse(inputVal);
    para.innerHTML = parsedText;
  };
</script>

<main>
  <div class="app">
    <h1>Markdown Editor</h1>
    <a href="/"><button class="back">Back</button></a>
    <div class="container">
      <textarea on:keyup={parseMarkdown} bind:value={inputVal} />
      <div class="text" />
    </div>
  </div>
</main>

<style>
  h1 {
    margin-top: 2rem;
    text-align: center;
    color: white;
  }

  .container {
    display: flex;
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: 2rem;
  }

  textarea {
    width: 40rem;
    height: 30rem;
    resize: none;
    border: 1px solid black;
    padding: 1.5rem;
    border-radius: 7px;
    background-color: rgb(32, 32, 57);
    color: white;
    font-size: 1.2rem;
  }

  .text {
    color: white;
    background-color: rgb(32, 32, 57);
    padding: 1.5rem 2rem;
    width: 40rem;
    height: 30rem;
    overflow-y: auto;
    border-radius: 7px;
    font-size: 1.2rem;
  }
  
  .back {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 7px;
    cursor: pointer;
    position: absolute;
    top: 2rem;
    left: 3.5rem;
    background-color: transparent;
    color: white;
    border: 1px solid white;
  }
</style>
