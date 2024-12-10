#rem
	interfaces.monkey
		MiniC N.Edition Interfaces
		
	Copyright (C) 2012-2014, E.Sandberg
	Released under the GNU Lesser General Public License (LGPL)
	See license.txt for more information
	
	Contributing Author(s): E.Sandberg, Anders Sahlin, Nicholas Grant
#end

Private
Import vm
Public

Interface IVMDelegate
	Method Exec:VMValue(scope:VMScope, params:VMValue[])
End

Interface IVMObjectInterface
	Method VMSet:VMValue( scope:VMScope, varName:String, data:VMValue )
	Method VMGet:VMValue( scope:VMScope, varName:String )
	Method VMCall:VMValue( scope:VMScope, varName:String, params:VMValue[] )
End

' operator overloading support
Interface IVMOverloadPlus
	Method VMPlus:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadMinus
	Method VMMinus:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadTimes
	Method VMTimes:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadDivBy
	Method VMDivBy:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadIntDivBy
	Method VMIntDivBy:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadModulo
	Method VMModulo:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadIntModulo
	Method VMIntModulo:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadNegate
	Method VMNegate:VMValue( scope:VMScope )
End

Interface IVMOverloadEqual
	Method VMEqual:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadNotEqual
	Method VMNotEqual:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadGreaterThan
	Method VMGreaterThan:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadLessThan
	Method VMLessThan:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadGreaterThanEqual
	Method VMGreaterThanEqual:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadLessThanEqual
	Method VMLessThanEqual:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadBitwiseAnd
	Method VMBitwiseAnd:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadBitwiseOr
	Method VMBitwiseOr:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadBitwiseXor
	Method VMBitwiseXor:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadBitwiseNot
	Method VMBitwiseNot:VMValue( scope:VMScope )
End

Interface IVMOverloadBoolNot
	Method VMBoolNot:VMValue( scope:VMScope )
End

Interface IVMOverloadShr
	Method VMShr:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadShl
	Method VMShl:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadLsr
	Method VMLsr:VMValue( scope:VMScope, value:VMValue )
End

Interface IVMOverloadPreIncrement
	Method VMPreIncrement:VMValue( scope:VMScope )
End

Interface IVMOverloadPostIncrement
	Method VMPostIncrement:VMValue( scope:VMScope )
End

Interface IVMOverloadPreDecrement
	Method VMPreDecrement:VMValue( scope:VMScope )
End

Interface IVMOverloadPostDecrement
	Method VMPostDecrement:VMValue( scope:VMScope )
End
