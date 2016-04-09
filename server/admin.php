<?php
include_once("DB.php");
$GLOBALS['db']=new DB($host,$username,$password,$database);


class admin extends DB {
    private $todo;

    public function __construct(){
        $this->todo=$_POST['todo'];
        $this->dispatcher($this->todo);
    }

    public function dispatcher($todo){
        switch($todo){
            case "login":
                $this->userLogin();
                break;
            case "addWord":
                $this->addWord();
                break;
            case "editWord":
                $this->editWord();
                break;
            case "addNoun":
                $this->addNoun();
                break;
            case "addVerb":
                $this->addVerb();
                break;

        }
    }



    protected function userLogin(){
        $username=htmlspecialchars(stripslashes($_POST['username']));
        $password=htmlspecialchars(stripslashes($_POST['password']));
        $sql='select * from admin where username="'.$username.'" and password="'.$password.'"';

        $result=$GLOBALS['db']->db_query($sql);


        if($GLOBALS['db']->db_query_rowsnum($result)>0) {
            $row = $GLOBALS['db']->db_assoc($result);
            $_SESSION['user_id']=$row["id"];

            $_SESSION['username']=$row["username"];
//            $_SESSION['user_type']="user";

            print(json_encode($row));
        }
        else{
            print(json_encode("ERROR"));
        }
    }


    protected function addWord(){
        $word=htmlspecialchars(stripslashes($_POST['word']));
        $root=htmlspecialchars(stripslashes($_POST['root']));
        $rootDesc=htmlspecialchars(stripslashes($_POST['rootDesc']));


        $sql='insert into words values(NULL,"'.$word.'","'.$root.'","'.$rootDesc.'")';
//        var_dump($sql);
        $GLOBALS['db']->db_query($sql);

        $last_id=$GLOBALS['db']->db_insid();
        print (json_encode($last_id));
    }


    protected function editWord(){
        $word=htmlspecialchars(stripslashes($_POST['word']));
        $root=htmlspecialchars(stripslashes($_POST['root']));
        $rootDesc=htmlspecialchars(stripslashes($_POST['rootDesc']));


        $sql='update words set root="'.$root.'", rootDesc="'.$rootDesc.'" where word="'.$word.'"';
//        var_dump($sql);
        $result = $GLOBALS['db']->db_query($sql);

        print (json_encode($result));
    }


    protected function addNoun(){
        $word=htmlspecialchars(stripslashes($_POST['word']));
        $noun=htmlspecialchars(stripslashes($_POST['noun']));
        $nounDesc=htmlspecialchars(stripslashes($_POST['nounDesc']));

        $sql='insert into nouns values(NULL,"'.$word.'","'.$noun.'","'.$nounDesc.'")';
        $result = $GLOBALS['db']->db_query($sql);

        print (json_encode($result));
    }


    protected function addVerb(){
        $word=htmlspecialchars(stripslashes($_POST['word']));
        $verb=htmlspecialchars(stripslashes($_POST['verb']));
        $verbDesc=htmlspecialchars(stripslashes($_POST['verbDesc']));

        $sql='insert into verbs values(NULL,"'.$word.'","'.$verb.'","'.$verbDesc.'")';
        $result = $GLOBALS['db']->db_query($sql);

        print (json_encode($result));
    }


}


$obj=new admin();


?>