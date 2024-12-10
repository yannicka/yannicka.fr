package;

interface IVMDelegate {
	public function exec(scope:VMScope, params:Array<VMValue>):VMValue;
}
