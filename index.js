let createButton = document.getElementById("button")
let modalOverlay = document.getElementById("modal-overlay")
let closeModalIcon = document.getElementById("closeModalIcon")
let nameOfWebsite = document.getElementById("nameOfWebsite")
let resourceForm = document.getElementById("resourceForm")
let linkOfWebsite = document.getElementById("linkOfWebsite")
let descriptionOfWebsite = document.getElementById("descriptionOfWebsite")
let resourcesSection = document.getElementById("resourcesSection")



function revealModalOverlay(){
    modalOverlay.classList.remove("modal-overlay")
    modalOverlay.classList.add("modal-overlay-visible")
    nameOfWebsite.focus()
}

createButton.addEventListener("click", revealModalOverlay)

function closeModalOverlay(){
    if(modalOverlay.classList.contains("modal-overlay-visible")){
        modalOverlay.classList.remove("modal-overlay-visible")
    modalOverlay.classList.add("modal-overlay")
    }
}

closeModalIcon.addEventListener("click", closeModalOverlay)


let resources = []
 
function printResourcesOnUI (){
    resourcesSection.textContent = ""


    resources.forEach(function(allResourcesFromArray){
        let printSiteName = allResourcesFromArray.siteName
        let printSiteLink = allResourcesFromArray.siteLink
        let printSiteDescription = allResourcesFromArray.siteDescription

        let resourceDiv = document.createElement("div")
        resourceDiv.classList.add("resource")

        let nameOfWebsiteDiv = document.createElement("div")
        nameOfWebsiteDiv.classList.add("name-of-website")

        let nameOfWebsiteText = document.createElement("a")
        nameOfWebsiteText.setAttribute("href", `${printSiteLink}`)
        nameOfWebsiteText.setAttribute("target", "_blank")
        nameOfWebsiteText.textContent = printSiteName

        let deleteIcon = document.createElement("i")
        deleteIcon.classList.add("fa-solid", "fa-trash")
        deleteIcon.setAttribute(`onclick`, `deleteResource('${printSiteLink}')`)

        let descriptionOfWebsiteDiv = document.createElement("div")
        descriptionOfWebsiteDiv.classList.add("description-of-website")

        let descriptionText = document.createElement("p")
        descriptionText.textContent = printSiteDescription


        descriptionOfWebsiteDiv.append(descriptionText)
        nameOfWebsiteDiv.append(nameOfWebsiteText, deleteIcon)
        resourceDiv.append(nameOfWebsiteDiv, descriptionOfWebsiteDiv)
        resourcesSection.append(resourceDiv)
    })
}

function deleteResource(printSiteLink){
    resources.forEach(function(resource, index){
        if(resource.siteLink === printSiteLink){
            resources.splice(index, 1)
        }
    })

    localStorage.setItem("resources", JSON.stringify(resources))
    fetchResources()
}

function fetchResources(){
    if(localStorage.getItem("resources")){
        resources = JSON.parse(localStorage.getItem("resources"))
    }
    printResourcesOnUI()
}
fetchResources()

resourceForm.addEventListener("submit", handleForm )
function handleForm(event){
    event.preventDefault()
    let websiteName = nameOfWebsite.value
    let websiteUrl = linkOfWebsite.value
    let description = descriptionOfWebsite.value

    if(nameOfWebsite.value === ""){
        nameOfWebsite.style.border = "1px solid red"
    }

    if(linkOfWebsite.value === ""){
        linkOfWebsite.style.border = "1px solid red"
    }

    if(descriptionOfWebsite.value === ""){
        descriptionOfWebsite.style.border = "1px solid red"
    }


    const aCreatedResource = {
        siteName : websiteName,
        siteLink : websiteUrl,
        siteDescription : description
    }

    resources.push(aCreatedResource)
    localStorage.setItem("resources", JSON.stringify(resources))
    fetchResources()
    resourceForm.reset()
    closeModalOverlay()
}


