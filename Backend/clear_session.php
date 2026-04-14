<?php
session_start();
session_destroy(); // deletes current session
echo "Session cleared!";