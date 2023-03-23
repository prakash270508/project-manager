<script>
  import { projects, deleteProject } from "../../store/ProjectStore";
</script>

{#if Array.isArray($projects || [])}
  {#each $projects as project}
    <div class="p-2 my-2">
      <h3 style="color: #62ffff;"><b>Project List</b></h3>
      <div
        class="card list my-3 ml-5"
        style="background-color: #131414; border-radius: 10px;"
      >
        <h6 style="background-color: #1c1d1d; height: 2.5vw;" class="p-2">
          <b>{project.projectTitle.toUpperCase()}</b>
        </h6>
        <p class="p-2" style="height: 6vw; height : fit-content">
          {project.projectdescription}
        </p>
        <a href={`/project/${project.id}`}>
          <button class="btn btn-outline-info mx-2 my-2" style="width : 27vw;"
            ><b>View Project Details</b></button
          >
        </a>
        <button
          class="btn deleteBtn mx-2 my-2"
          on:click={() => deleteProject(project.id)}
          ><b>Delete Project</b></button
        >
      </div>
    </div>
  {/each}
{:else}
  <p>No projects found.</p>
{/if}

<style>
  .list {
    background-color: black;
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
