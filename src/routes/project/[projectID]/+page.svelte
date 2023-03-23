<script>
  import { page } from "$app/stores";
  import { projects } from "../../../lib/store/ProjectStore";

  const projectId = $page.params.projectID;

  let project = {};
  let clicked = false;
  let moreDetails = "";

  projects.subscribe((lists) => {
    project = lists.find((item) => item.id === projectId);
  });

  const handleDetails = () => {
    project.moreDetails = moreDetails;

    // Update the projects store to save the updated data in the localStorage
    projects.update((prevalue) => {
      const updatedProjects = prevalue.map((item) => {
        if (item.id === projectId) {
          return { ...item, moreDetails };
        } else {
          return item;
        }
      });
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return updatedProjects;
    });

    moreDetails = "";
    clicked = false;
  };
</script>

{#if project}
  <div class="page my-3">
    <h2 style="color: #62ffff;"><b>{project.projectTitle.toUpperCase()}</b></h2>
    <div>Due Date : <b>{project.dueDate}</b></div>
    <br />
    <div>
      Description : <i>{project.projectdescription}.</i>
    </div>
    <br />

    {#if !project.detailsAdded}
      {#if clicked}
        <div>
          <div class="d-flex">
            <h6 style="color: #62ffff;"><b>Project Budget : </b></h6>
            <h6 class="mx-2"><i>2,00,000</i></h6>
          </div>
          <div class="d-flex my-1">
            <h6 style="color: #62ffff;"><b>Project Owner : </b></h6>
            <h6 class="mx-2"><i> Prakash Pandey</i></h6>
          </div>
          <div class="text-center">
            <h4 style="color: #62ffff;"><b>Project Members</b></h4>
          </div>
          <div class="d-flex text-center my-4 justify-content-center">
            <div class="col-3">
              <div class="card my-2 bg-dark">
                <b>Aggigned Work</b>
                <button class="btn deleteBtn"><b>Hansraj</b></button>
              </div>
            </div>
            <div class="col-3">
              <button class="btn deleteBtn"><i>Hansraj</i></button>
            </div>
            <div class="col-3">
              <button class="btn deleteBtn"><i>Hansraj</i></button>
            </div>
            <div class="col-3">
              <button class="btn deleteBtn"><i>Hansraj</i></button>
            </div>
          </div>
        </div>
        <button class="btn addBtn w-100" on:click={() => (clicked = false)}
          ><b>close More details</b></button
        >
      {:else}
        <a href={`/add-details/${projectId}`}>
          <button class="btn addBtn w-100" on:click={() => (clicked = true)}
            ><b>Add More details</b></button
          >
        </a>
      {/if}
    {/if}
  </div>
{/if}

<style>
  .page {
    margin-left: 20vw;
    margin-right: 20vw;
  }
  .addBtn {
    background-color: #62ffff;
    color: black;
  }
  .deleteBtn {
    background-color: transparent;
    border: 0.2px solid #62ffff;
    color: #62ffff;
  }

  .deleteBtn:hover {
    background-color: #62ffff;
    border: 0.2px solid black;
    color: black;
  }
</style>
