import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Soldier: new ImageSource('images/topdown-soldier.png'),
    Zombie: new ImageSource('images/topdownzombie.png'),
    FatZombie: new ImageSource('images/fatzombie.png'),
    Background: new ImageSource('images/background.png')
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }