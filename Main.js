
let Questions_Count = document.querySelector(".Questions_Count span")

let The_Question = document.querySelector(".The_Question")

let Div_Of_Answer = document.querySelector(".Div_Of_Answer");

let Answer_Input = document.getElementsByName('Answer');

let label_Of_Answer = document.querySelectorAll(".label_Of_Answer")

let Submit_Answer = document.querySelector(".Submit_Answer")

let Place_Of_Bullets = document.querySelector(".Div_Of_Stars");

let Main_Div = document.querySelector(".Main_Div")

let Resulte = document.querySelector(".Resulte")


const Minutes = document.querySelector(".Minutes")

const secodes = document.querySelector(".secodes")

Minutes.addEventListener("click" , ()=>{
   
  
})


let CurrentIndex = 0;


let Right = 0;


let Wrong = 0;


function GetJesonData() {


    let jsonData = new XMLHttpRequest();


    jsonData.onload = function () {

        if (this.status === 200 && this.readyState === 4) {


            let Questions_Object = JSON.parse(this.responseText)

            let Questions_length = Questions_Object.length;

            creatBullets(Questions_length);


            Add_Question(Questions_Object[CurrentIndex], Questions_length);




            Submit_Answer.addEventListener("click", () => {

                let Right_Answer = Questions_Object[CurrentIndex].right_answer;


                CurrentIndex = CurrentIndex + 1;

                checked_Ansewr(Right_Answer, Questions_length)

                if (CurrentIndex < Questions_length) {

                    Add_Question(Questions_Object[CurrentIndex], Questions_length);
                }
                else {
                    Main_Div.style.display = "none";

                    Resulte.textContent = `You Answerd ${Right} Of ${Questions_length}`

                    Resulte.style.display = "block";


                }


                Handel_Circel()



            });
        }
        else {
            console.log("Faild")
        }

    }

    jsonData.open("GET", "questions.json", true);

    jsonData.send();


}






function creatBullets(Num) {


    Questions_Count.innerHTML = Num;




    for (let I = 0; I < Num; I++) {
        let Creat_Span = document.createElement("span");

        if (I === 0) {
            Creat_Span.classList.add("checked");
        }

        Creat_Span.classList.add("circle");

        Place_Of_Bullets.appendChild(Creat_Span);

    }


}


function Add_Question(Questions_Object, Questions_length) {

    The_Question.textContent = Questions_Object.title;



    for (let I = 0; I < label_Of_Answer.length; I++) {

        Answer_Input[I].dataset.answer = Questions_Object[`answer_${I + 1}`]

        label_Of_Answer[I].textContent = Questions_Object[`answer_${I + 1}`];

        if (I === 0)
            Answer_Input[I].checked = true;


    }




}


function checked_Ansewr(Right_Answer, Questions_length) {

    let The_Choosen_Answer;


    for (let I = 0; I < Answer_Input.length; I++) {


        if (Answer_Input[I].checked) {
            The_Choosen_Answer = Answer_Input[I].dataset.answer;
        }

    }



    if (The_Choosen_Answer === Right_Answer) {

        Right += 1;

    }

    else {

        Wrong += 1;

    }




}


function Handel_Circel() {



    let spans = document.querySelectorAll(".circle");

    let Array_Span = Array.from(spans)

    Array_Span.forEach((Span, Index) => {
        if (Index === CurrentIndex) {
            Span.classList.add("checked");
        }
    })

}


function Handel_Circel_Remove() {



    let spans = document.querySelectorAll(".circle");

    let Array_Span = Array.from(spans)

    Array_Span.forEach((Span, Index) => {

        Span.classList.remove("checked");

    })

}



GetJesonData();
