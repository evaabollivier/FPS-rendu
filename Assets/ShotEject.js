#pragma strict

var bulletCasing : Rigidbody;
var ejectSpeed : int = 100;
var fireRate : float = 0.5;
private var nextFire : float = 0.0;
private var fullAuto = false;

var clip : int = 30;
var maxclip : int = 30;
var reserve : int = 90;
var minreserve : int = 0;

var shotsound : AudioClip;
var reloadsound : AudioClip;

var MunMax : boolean = true;

function Update () {

if(Input.GetButton("Fire1") && Time.time > nextFire){
if(clip >=1){
nextFire = Time.time + fireRate;

var bullet : Rigidbody;

bullet = Instantiate(bulletCasing, transform.position, transform.rotation);
clip -=1;
GetComponent.<AudioSource>().PlayOneShot(shotsound);
bullet.velocity = transform.TransformDirection(Vector3.left * ejectSpeed);
}
}

if(Input.GetKeyDown("v")){
fullAuto = !fullAuto;
}

if(Input.GetKeyDown("r")){
GetComponent.<AudioSource>().PlayOneShot(reloadsound);
if(reserve >= 30){
RemoveReserve();
clip += maxclip - clip;
}

if(reserve <= 30){
clip += reserve;
RemoveReserve();
}
}

if(fullAuto == true){
fireRate = 0.10;
}else{
fireRate = 0.5;
}

if(reserve <= 0){
reserve =0;
}

}

function OnGUI(){
GUI.Box(Rect(10,10,130,25), clip+ " / " +reserve);
}

function RemoveReserve(){
reserve -= maxclip - clip;
}