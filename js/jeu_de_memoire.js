'use strict'

let nb_clics = 0 // controler le nombre de clique pour obtenir les 2 bonne images --> si nb_clics = 2 alors reinitialiser a 0 car 2 images ont ete cliquer
let image1 = '' // premiere image cliquer
let image2 ='' // deuxieme image cliquer
let case1 = '' // memoriser la div ou la premiere image a ete cliquer pour pas confondre avec la deuxieme
let case2='' // memoriser la div ou la deuxieme image a ete cliquer pour pas confondre avec la premiere
let nb_img_trouver = 0// le nombre d'image trouver qui s'incremente chaque fois que l'on trouve la bonne paire d'image 
let nb_img_pas_trouver=0 // le nombre d'erreur qui s'incremente a chaque fois que l'on trouve pas les meme images
let score_final=0
let depart = false // en commencamt la partie au debut / et si la bonne paire d'image ne correspond pas = false sinon = true pour jouer/rejouer
let timer_is_on = 0 // timer n'est pas encore lancer
let chrono=0
let stopGameDisplay = false
let fin_parti
let audio=document.createElement('audio')
let first=true
let nouvellePartieElement = document.getElementById('bouton')
let temps_debut_partie  = new Date().getTime() // timner qui recupere l'heure exacte a la quel commence la partie

fenetre_debut() // initialise le premier view avant que la partie commence

checkParameter(window.location.href)

afficher_timer_null()

function checkParameter(url){

    if(url.indexOf('partie') > -1){

        //Change button inner html
        nouvellePartieElement.value = 'Arrêter partie'
        stopGameDisplay = true
        placement_aleatoire_images()
        timer();
     
    }

}

    window.addEventListener('mousedown',onmousedown)
 // l'autoplay de l'audio ne fonctionne pas surt google alors je contourne le problem avec la simulation d'un click
    function onmousedown(){
       if(!first) return
       first=false
       audio.src="images/Soul-Colors.mp3"
       audio.play()
       
    }

function fenetre_debut() // initialise le premier view avant que la partie commence
{
	let nb_aleatoire=""
    let nb_img=""
    let test = true
    let chaine = ""
    clearInterval(chrono)
  
    for (let i=0;i<16;i++)
    {
        while (test==true)
        {
            nb_aleatoire = Math.floor(Math.random()*16) + 1 // Formule Pour le placement aleatoire des images dans les 16 cases
            if(chaine.indexOf("-" + nb_aleatoire + "-")>-1)
            nb_aleatoire = Math.floor(Math.random()*16) + 1
            else
            {
                nb_img = Math.floor((nb_aleatoire+1)/2); //8 paires pour 16 placement d'images ==> 2 générations différentes par image
                document.getElementById('case' + i).innerHTML = "<img style='cursor:pointer;' id='img" + i + "' src='images/animaux/miniature" + nb_img + ".png' onClick='' alt='' />"
                chaine += "-" + nb_aleatoire + "-"
                test=false
            }			
        }
        test=true	

	}

}

function placement_aleatoire_images()
{
	let nb_aleatoire=""
    let nb_img=""
    let test = true
    let chaine = ""
    
    for (let i=0;i<16;i++)
    {
        while (test==true)
        {
            nb_aleatoire = Math.floor(Math.random()*16) + 1 // Formule Pour le placement aleatoire des images dans les 16 cases
            if(chaine.indexOf("-" + nb_aleatoire + "-")>-1)
            nb_aleatoire = Math.floor(Math.random()*16) + 1
            else
            {
                nb_img = Math.floor((nb_aleatoire+1)/2); //8 paires pour 16 placement d'images ==> 2 générations différentes par image
                document.getElementById('case' + i).innerHTML = "<img style='cursor:pointer;' id='img" + i + "' src='images/animaux/miniature" + nb_img + ".png' onClick='verifier_bonne_paire_de_carte(\"img" + i + "\", \"miniature" + nb_img + "\")' alt='' />"
                chaine += "-" + nb_aleatoire + "-"
                test=false
            }			
        }
        test=true	
    
	}
    
   // temporisation du code : cacher les images au bout d'un certain delais
const delais_attente_pour_cacher_image = setTimeout(function() 
{   

    for (let i=0;i<16;i++)
    {
        document.getElementById('img' + i).src = 'images/miniature02.gif' // cacher les images en les remplacant par des images vide 
    }
    depart = true; // indicateur pour savoir si l'on peut jouer ( on peut continuer a jouer une fois que les cartes sont cacher )

},5000 ) // delais de 5 secondes avant que les images se cachent

}

  function afficher_timer_null() {
    let min=0
    let sec=0
    let milisec=0
    let temps=(min*60+sec)*10+milisec

    min=Math.floor(temps/600);
    sec=Math.floor((temps-min*600)/10);
    milisec=temps-((min*60)+sec)*10;
    temps++;
    document.getElementById('temps').innerHTML = min + 'min' +':' + sec + 'sec' + ':' + milisec + 'milisec'
}

function timer() // fonction du timer
 {
    let min=0
    let sec=0
    let milisec=0
    let temps=(min*60+sec)*10+milisec;
    
    chrono=setInterval(function ()
    {

        min=Math.floor(temps/600);
        sec=Math.floor((temps-min*600)/10);
        milisec=temps-((min*60)+sec)*10;
        temps++;
        document.getElementById('temps').innerHTML = min + 'min' +':' + sec + 'sec' + ':' + milisec + 'milisec'

    },100); 

}   

fin_parti = setTimeout(temps_finis, 180000) 
function temps_finis() // si la partie depasse 180 donc 3 minutes
 { 

        document.getElementById('paireTrouver').innerHTML =  'Vous avez trouvé que ' + nb_img_trouver + ' paires'
        document.getElementById('tempsFinal').innerHTML = 'Le temps imparti est écoulé, vous avez ' + '<span style="color: tomato;"> PERDU!  </span>'
        nouvellePartieElement.value = 'Nouvelle partie'
        timer_is_on = 0;
        clearInterval(chrono)
        clearTimeout(fin_parti);
        // write_score(temps_ecouler_pendant_partie)
        depart=false;
    
}

window.addEventListener('mousedown',onmousedown)
// l'autoplay de l'audio ne fonctionne pas surt google alors je contourne le problem avec la simulation d'un click
   function onmousedown(){
      if(!first) return
      first=false
      audio.src="images/Soul-Colors.mp3"
      audio.play()
      
   }

document.getElementById('paireTrouver').innerHTML =  'Vous avez trouvé ' + nb_img_trouver  + ' paires'
document.getElementById('tentative').innerHTML = score_final // afficher au debut de la partie  score = 0


// verifier et valider les paires trouver par le joueur
function verifier_bonne_paire_de_carte(nom_img_cliquer,source_img_cliquer) {
 
  
// condition si le joueur peut jouer une fois que les cartes sont retourner sinon il 'a pas encore le droit de cliquer
if (depart ==  true) 
{
   
    let temps_ecouler_pendant_partie = Math.floor((new Date().getTime() - temps_debut_partie)/1000)
    
    document.getElementById('paireTrouver').innerHTML =  'Vous avez trouvé ' + nb_img_trouver  + ' paires'
    nb_clics ++; // incremneter le prenmier clique sur la premiere image
    
  
    document.getElementById(nom_img_cliquer).src = "images/animaux/" + source_img_cliquer + ".png"
  
    if (nb_clics == 1) { // memoriser si la premiere image est cliquer
        image1 = source_img_cliquer 
        case1 = nom_img_cliquer
     
        
    }
    else
    { // sinon memoriser les 2 images qui ont ete cliquer

        image2 = source_img_cliquer 
        case2 = nom_img_cliquer
        
        if(case1!=case2) // verifier si le nom de la premiere image cliquer est diffent de la deuxieme image
        {
            depart=false // ne pas donner la permision au joueru de cliquer tant que les images se sont pas retourner

            if (image1 != image2) { // cacher les images si elle ne sont pas pareil
 
                let delais_attente_pour_carte_cliquer = setTimeout( function() 
                {
                    let firstCaseDivElement = document.getElementById(case1).parentElement //recupere le parent du premier image cliquer
                    firstCaseDivElement.style.transform = 'rotateY(180deg)' // fliper le premier div
                    document.getElementById(case1).src = 'images/miniature02.gif' // masquer image 1 


                    let secondCaseDivElement = document.getElementById(case2).parentElement//recupere le parent du deuxieme image cliquer
                    secondCaseDivElement.style.transform = 'rotateY(180deg)' // fliper le deuxieme div
                    document.getElementById(case2).src = 'images/miniature02.gif' // // masquer image 2
                    depart = true // permettre au joueur de continuer a jouer car les cartes sont maintenant retourner
                    nb_clics = 0 // reinitialiser le nombre de clique sur les 2 images
                    nb_img_pas_trouver ++ ; // incrementer le nombre de fois que le joueur n'a pas trouver les bonne images
                    score_final = nb_img_pas_trouver; // le score final correspond au nombre dessaie
                    document.getElementById('score').innerHTML = score_final // afficher le score en nombre de tentative essaie

                }, 1000 ) // delais de 1 seconde pour retourner les images si on pas trouver la bonne paires
            }
            else
            {
              
                depart=true;
                nb_clics=0;
                nb_img_trouver++; // incremente a chaque fois que la paire est trouver 
                if(nb_img_trouver==8) // si les 16 images sont retrouner alors le joueur a tout trouver
                {
                
                clearTimeout(fin_parti);
                clearInterval(chrono) // arreter le timer
                document.getElementById('paireTrouver').innerHTML =  'Vous avez trouvé ' + nb_img_trouver  + ' paires'
                document.getElementById('tentative').innerHTML = 'Vous avez gagné en ' + score_final + ' tentatives'  // afficher le score en nombre de tentative sur 10
                document.getElementById('tempsFinal').innerHTML = 'Vous avez terminé en ' + '<span style="color: tomato;">' + temps_ecouler_pendant_partie + 'secondes' + '</span>' // afficher le temps ecouler pendant la partie en seconde
                nouvellePartieElement.value = 'Nouvelle partie'
                stopGameDisplay = false
                let score_precedent = localStorage.getItem("score_precedent")
                if(score_precedent != 'null' && score_precedent != null){
                if (temps_ecouler_pendant_partie < score_precedent ) {

                    document.getElementById('meilleur').innerHTML = '<span style="color: greenyellow;">' +'FÉLICITATION!' + '</span>' + ' Vous avez battu le record qui etait de ' + '<span style="color: red;">' +  score_precedent  + 'secondes' + '</span>'
                    document.getElementById('citation').innerHTML = "<< La mémoire est la mère de la sagesse >> (Proverbe Danois)"
                    //document.getElementById('citation').innerHTML = "<< La mémoire est la mère de la sagesse >> (Proverbe Danois)"
                               
               }
               else{

                document.getElementById('meilleur').innerHTML = '<span style="color: red;">' + 'DOMMAGE! ' + '</span>' + 'Réessayer de battre le record qui etait de ' + '<span style="color: red;">' +  score_precedent  + 'secondes' + '</span>'
                document.getElementById('citation').innerHTML = "<< Où l'intérêt cesse, se perd aussi la Mémoire >> (Grégoire Lacroix)"
                //document.getElementById('citation').innerHTML = "<< La mémoire est la mère de la sagesse >> (Proverbe Danois) >>"

               }
            }else{
                document.getElementById('meilleur').innerHTML = "C'est seulement votre première partie rejouez encore pour battre votre propre Record"
                //document.getElementById('citation').innerHTML = "<< Où l'intérêt cesse, se perd aussi la Mémoire >> (Grégoire Lacroix)"
                document.getElementById('citation').innerHTML = "<< Où l'intérêt cesse, se perd aussi la Mémoire >> (Grégoire Lacroix)"

            }

               localStorage.setItem("score_precedent", temps_ecouler_pendant_partie)
                             
            }

            }

        }
        else
        { // sinon les 2 image sont les meme et donc la bonne paire est bien trouver

            if (nb_clics==2)  nb_clics=1
           
        }
      
    }

    
}

}

function demarer() {

    if(stopGameDisplay === false)
    {
        nouvellePartieElement.value = 'Arreter la partie'
        placement_aleatoire_images()
        timer();
        stopGameDisplay = true

    }
    
}

nouvellePartieElement.addEventListener('click', function(){

    let url = window.location.href
    let caracPrtie = 'partie=1'
    if(url.indexOf('partie') === -1){

        let newUrl = url+"?partie=1"
        window.location.href=newUrl

    }else{

        if(stopGameDisplay === true){
            
            let parameterPosition = url.indexOf('partie')
            if(parameterPosition > -1){
                let newGame = url.substring(0, (parameterPosition - 1))
                window.location.href= newGame
               
            }

        }else{
        
            window.location.reload()
        
        }
      
    }
    
})

