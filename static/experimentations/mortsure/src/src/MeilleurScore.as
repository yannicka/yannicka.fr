package {
	import org.flixel.*;
 
	public class MeilleurScore {
		private static var _save:FlxSave;
		private static var _temp:int = 0;
		private static var _loaded:Boolean = false;
 
		public static function get meilleurScore():int {
			if (_loaded) {
				return _save.data.meilleurScore;
			} else {
				return _temp;
			}
		}

		public static function set meilleurScore(value:int):void {
			if (_loaded) {
				_save.data.meilleurScore = value;
			} else {
				_temp = value;
			}
		}

		public static function load():void {
			_save = new FlxSave();
			_loaded = _save.bind("monMeilleurScore");
			if (_loaded && _save.data.meilleurScore == null) {
				_save.data.meilleurScore = 0;
			}
		}
	}
}