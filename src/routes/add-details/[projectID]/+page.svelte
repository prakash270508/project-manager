<script>
  import { v4 as uuidv4 } from "uuid";
  import { page } from "$app/stores";
  import { writable } from "svelte/store";
  import { projects } from "../../../lib/store/ProjectStore";

  const projectId = $page.params.projectID;

  let project = {};
  const projectMembers = writable([]);
  let membersArray = [];
  let projMember = "";
  let work = "";
  let owner = "";
  let budget = "";
  let error = "";

  projects.subscribe((lists) => {
    project = lists.find((item) => item.id === projectId);
  });

  function addMember() {
    projectMembers.update((members) => [
      ...members,
      { name: projMember, work },
    ]);

    membersArray.push({ id: uuidv4(), projMember, work });

    projMember = "";
    work = "";
  }

  const handleSubmit = () => {
    if (owner == "" || budget == "" || projectMembers.length == 0) {
      error = "Please fill all details";
      return setTimeout(() => {
        error = "";
      }, 3000);
    }

    const moreDetails = {
      membersArray,
      owner,
      budget,
    };

    project.moreDetails = moreDetails;
    project.detailsAdded = true;

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

    owner = "";
    budget = "";
    projectMembers.update(() => []);
  };

  console.log(project);
</script>

<div class="home">
  {#if project}
    <h1 class="text-center my-3" style="color: #62ffff;">
      <b>More Details</b>
    </h1>
    <a href={`/project/${projectId}`}>
      <button class="btn addBtn"><b>Go to project</b></button>
    </a>
    <div class="my-5">
      <div class="row">
        <div class="col-6">
          <b>Project Budget</b>
          <input
            type="number"
            class="form-control bg-dark"
            on:change={(e) => (budget = e.target.value)}
            value={budget}
          />
        </div>
        <div class="col-6">
          <b>Project Owner</b>
          <input
            type="text"
            class="form-control bg-dark"
            on:change={(e) => (owner = e.target.value)}
            value={owner}
          />
        </div>
        <div class="my-4">
          <b class="">Project Members</b>
          <div class="d-flex">
            <input
              type="text"
              on:change={(e) => (projMember = e.target.value)}
              value={projMember}
              class="form-control bg-dark w-25"
              placeholder="Member Name"
            />
            <input
              type="text"
              on:change={(e) => (work = e.target.value)}
              value={work}
              class="form-control bg-dark w-50 mx-2"
              placeholder="Assigned work"
            />
            <button class="btn btn-primary mx-1" on:click={addMember}
              >Add Members</button
            >
          </div>
        </div>
        <ul class="mx-5">
          {#each $projectMembers as projmmbr, index (index)}
            <li style="color:white;">{projmmbr.name} : {projmmbr.work}</li>
          {/each}
        </ul>
      </div>
      <div class="text-danger">{error}</div>
      <button type="submit" on:click={handleSubmit} class="btn addBtn w-100"
        ><b>Add details</b></button
      >
    </div>
  {:else}
    <h1>No project found</h1>
  {/if}
</div>

<style>
  .home {
    margin-left: 20vw;
    margin-right: 20vw;
  }
  .form-control {
    color: white;
  }
  .addBtn {
    background-color: #62ffff;
    color: black;
  }
</style>
