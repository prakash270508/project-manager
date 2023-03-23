<script>
  import { v4 as uuidv4 } from "uuid";
  import { addProject } from "../../store/ProjectStore";

  let projectTitle = "";
  let projectdescription = "";
  let dueDate = "";
  let error = "";

  let count;

  const handleSubmit = () => {
    if (projectTitle == " " || projectdescription == "" || dueDate == "") {
      error = "Please fill all details";
      return setTimeout(() => {
        error = "";
      }, 3000);
    }

    if (projectdescription.split(" ").join("").length < 50) {
      error = "Description cannot be less than 50 character";
      return setTimeout(() => {
        error = "";
      }, 3000);
    }

    addProject({
      id: uuidv4(),
      projectTitle,
      projectdescription,
      dueDate,
      detailsAdded: false,
    });

    projectTitle = "";
    projectdescription = "";
    dueDate = "";
  };
</script>

<div class="p-2">
  <h3 style="color: #62ffff;"><b>Add Project</b></h3>
  <div class="my-2">
    <form on:submit={handleSubmit}>
      <div>Title</div>
      <input
        type="text"
        class="form-control bg-dark my-1 mb-4"
        style="color: white;"
        on:change={(e) => (projectTitle = e.target.value)}
        value={projectTitle}
      />
      <div>Project Description</div>
      <textarea
        class="bg-dark form-control  mb-4"
        style="color: white;"
        rows="5"
        on:input={(e) =>
          (projectdescription = e.target.value)(
            (count = 50 - projectdescription.split(" ").join("").length)
          )}
        value={projectdescription}
      />
      {#if projectdescription
        .split(" ")
        .join("").length > 0 && projectdescription
          .split(" ")
          .join("").length <= 50}
        <div class="text-danger">{count} more character</div>
      {/if}
      <div>Due Date</div>
      <input
        type="date"
        class="form-control bg-dark my-1 mb-4"
        style="color: white;"
        on:change={(e) => (dueDate = e.target.value)}
        value={dueDate}
      />
      <div class="text-danger">{error}</div>
      <button class="btn addBtn w-100" type="submit"><b>Add Project</b></button>
    </form>
  </div>
</div>

<style>
  .addBtn {
    background-color: #62ffff;
    color: black;
  }
</style>
