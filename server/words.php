<?php
include_once("DB.php");
$GLOBALS['db']=new DB($host,$username,$password,$database);


class words extends DB {
    private $todo;

    public function __construct(){
        $this->todo=$_POST['todo'];
        $this->dispatcher($this->todo);
    }

    public function dispatcher($todo){
        switch($todo){
            case "getWordInfo":
                $this->getWordInfo();
                break;
            case "getWordNouns":
                $this->getWordNouns();
                break;
            case "getWordVerbs":
                $this->getWordVerbs();
                break;
            case "getLast10":
                $this->getLast10();
                break;
        }
    }

    protected function getWordInfo(){
        $word=htmlspecialchars(stripslashes($_POST['word']));
        $sql='select * from words where word like "%'.$word.'%"';

        $result=$GLOBALS['db']->db_query($sql);
        $row = $GLOBALS['db']->db_assoc($result);


        $sql1 = 'delete from lastWords where word="'.$word.'"';
        $result1=$GLOBALS['db']->db_query($sql1);

//        Add to  last words
        $sql2 = 'insert into lastWords values(NULL,"'.$word.'")';
        $result2=$GLOBALS['db']->db_query($sql2);

        print(json_encode($row));
    }

    protected function getWordNouns(){
        $word=htmlspecialchars(stripslashes($_POST['word']));
        $sql='select * from nouns where word like "%'.$word.'%"';

        $result=$GLOBALS['db']->db_query($sql);
        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }
        print(json_encode($total));
    }

    protected function getWordVerbs(){
        $word=htmlspecialchars(stripslashes($_POST['word']));
        $sql='select * from verbs where word like "%'.$word.'%"';

        $result=$GLOBALS['db']->db_query($sql);
        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }
        print(json_encode($total));
    }

    protected function getLast10(){
        $sql='select * from lastwords order by id desc limit 10';

        $result=$GLOBALS['db']->db_query($sql);
        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }
        print(json_encode($total));
    }
}

$obj=new words();


?>