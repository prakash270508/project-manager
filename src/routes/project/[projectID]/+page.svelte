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

  console.log(project);
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
      <a href={`/add-details/${projectId}`}>
        <button class="btn addBtn w-100" on:click={() => (clicked = true)}
          ><b>Add More details</b></button
        >
      </a>
    {:else if project.moreDetails}
      <div>
        <div class="d-flex">
          <h6 style="color: #62ffff;"><b>Project Budget : </b></h6>
          <h6 class="mx-2"><i>{project.moreDetails.budget}</i></h6>
        </div>
        <div class="d-flex my-1">
          <h6 style="color: #62ffff;"><b>Project Owner : </b></h6>
          <h6 class="mx-2">
            <i>{project.moreDetails.owner ? project.moreDetails.owner : ""}</i>
          </h6>
        </div>
        <div class="text-center">
          <h4 style="color: #62ffff;"><b>Project Members</b></h4>
        </div>
        <div class="d-flex text-center my-4 justify-content-center">
          {#each project.moreDetails.membersArray as members (members.id)}
            <div class="col-3">
              <div class="card my-2 mx-3 bg-dark">
                <h5><b>{members.projMember}</b></h5>
                <div><i>{members.work}</i></div>
              </div>
            </div>
          {/each}
        </div>
      </div>
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
</style>
