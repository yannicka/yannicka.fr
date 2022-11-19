<?php
	/**
	 * Gestion de la base de données
	 */
	class DB {
		/**
		 * @const bool
		 */
		const ARR = false;

		/**
		 * @const bool
		 */
		const OBJ = true;

		private $db;
		private $nb_queries = 0;

		/**
		 * Connexion à la base de données
		 *
		 * @param string $host Hôte de la base de données
		 * @param string $dbname Nom de la base de données
		 * @param string $username Nom d'utilisateur pour la connexion
		 * @param string $passwd Mot de passe pour la connexion
		 * @param string $dsn Nom du pilote de connexion (exemples : mysql, sqlite, pgsql, etc.)
		 */
		public function __construct($host, $dbname, $username, $passwd, $dsn = 'mysql', $driver_options = array()) {
			try {
				$this->db = new PDO('sqlite:' . dirname(__FILE__) . '/db.sqlite');
				$this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
				$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			} catch (PDOException $e) {
				echo 'Impossible d\'accéder à la base de données SQLite : ' . $e->getMessage();
				exit;
			}

			$this->db->query('
				create table message(
					id            integer autoincrement,
					date_message  integer,
					content       text,
					content_clean text,
					ip            varchar,
					vote_up       integer,
					vote_down     integer
				);
			');

			$this->db->query('
				create table date_news(
					id         integer autoincrement,
					date_begin integer,
					date_end   integer
				);
			');

			$this->db->query('
				create table message_date(
					id_message integer,
					id_date    integer
				);
			');

			$this->db->query('
				create table hashtag(
					id      integer autoincrement,
					content text
				);
			');

			$this->db->query('
				create table message_hashtag(
					id_message integer,
					id_hashtag integer
				);
			');

			$this->db->query('
				create table vote(
					ip         varchar,
					id_message integer,
					value      integer
				);
			');
		}

		/**
		 * Insertion d'un enregistrement
		 *
		 * @param string $table
		 * @param array $values
		 *
		 * @return mixed
		 */
		public function insert($table, $values = array()) {
			$this->increment_queries();

			$req = $this->db->prepare('INSERT INTO ' . $table . '(' . implode(', ', array_keys($values)) . ') VALUES(:' . implode(', :', array_keys($values)) . ');');
			$req->execute($values);

			return $this->last_insert_id();
		}

		/**
		 * Mise à jour d'enregistrements
		 *
		 * @param string $table
		 * @param array $values
		 *
		 * @return mixed
		 */
		public function update($query, $values = array()) {
			$this->increment_queries();

			return $this->db->prepare('UPDATE ' . $query)->execute($values);
		}

		/**
		 * Suppression d'enregistrements
		 *
		 * @param string $table
		 * @param array $values
		 *
		 * @return mixed
		 */
		public function delete($query, $values = array()) {
			$this->increment_queries();

			return $this->db->prepare('DELETE FROM ' . $query)->execute($values);
		}

		/**
		 * Sélectionner des enregistrements selon des critères
		 *
		 * @param string $table
		 * @param array $values
		 *
		 * @return mixed
		 */
		public function select($query, $values = array()) {
			return new DBStatement($query, $values, $this);
		}

		/**
		 * Récupérer le dernier identifiant inséré dans la base de données
		 *
		 * @return string
		 */
		public function last_insert_id($name = NULL) {
			return $this->db->lastInsertId($name);
		}

		/**
		 * Commencer une nouvelle transaction
		 * 
		 * @return bool
		 */
		public function begin() {
			return $this->db->beginTransaction();
		}

		/**
		 * Valider la transaction courante
		 *
		 * @return bool
		 */
		public function send() {
			return $this->db->commit();
		}

		/**
		 * Annule la transaction courante
		 *
		 * @return bool 
		 */
		public function back() {
			return $this->db->rollBack();
		}

		/**
		 * Exécuter une requête quelquonque
		 *
		 * @param string $query
		 *
		 * @return mixed
		 */
		public function query($query) {
			return $this->db->prepare($query);
		}

		/**
		 * Récupérer la connexion à la base de données
		 *
		 * @return PDO
		 */
		public function get_db() {
			return $this->db;
		}

		/**
		 * Connaître le nombre de requêtes exécuté par l'objet courant
		 *
		 * @return int
		 */
		public function get_nb_queries() {
			return $this->nb_queries;
		}

		/**
		 * Incrémenter le compteur de requête
		 *
		 * @return DB
		 */
		public function increment_queries() {
			$this->nb_queries++;

			return $this;
		}
	}

		/**
		 */
	class DBStatement {
		private $query;
		private $values;
		private $connection;
		private $db;

		/**
		 */
		public function __construct($query, $values, $connection) {
			$this->query      = $query;
			$this->values     = $values;
			$this->connection = $connection;
			$this->db         = $this->connection->get_db();

			return $this;
		}

		/**
		 */
		public function count() {
			return $this->select()->rowCount();
		}

		/**
		 */
		public function one($obj = DB::OBJ) {
			return $this->select()->fetch(($obj) ? \PDO::FETCH_OBJ : \PDO::FETCH_BOTH);
		}

		/**
		 */
		public function all($obj = DB::OBJ) {
			return $this->select()->fetchAll(($obj) ? \PDO::FETCH_CLASS : \PDO::FETCH_BOTH);
		}

		/**
		 */
		public function add($query, $values = array()) {
			$this->query .= ' ' . $query;
			$this->values = array_merge($this->values, $values);

			return $this;
		}

		/**
		 */
		private function select() {
			$this->connection->increment_queries();

			$return = $this->db->prepare('SELECT ' . $this->query);
			$return->execute($this->values);

			return $return;
		}
	}
