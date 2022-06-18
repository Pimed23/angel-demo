pragma solidity ^0.4.17;

contract Monitor {
    struct Measure {
        uint start_timestamp;
        uint end_timestamp;
        address equipment_address;
        address monitored_person;
        bool is_normal;
    }
    
    Measure[] public measures;
    mapping(address => address) public equipment_to_person;
    address public manager;
    address public patient;

    function Monitor( address creator, address target ) public {
        manager = creator;
        patient = target;
    }

    function addEquipment(address equipment, address person) public {
        equipment_to_person[equipment] = person;
    }
    
    function createMeasure(uint start, uint end, address equipment, address target, bool is_normal ) public {
        require(end-start > 50);
        require(equipment_to_person[equipment] == target);

        Measure memory newMeasure = Measure({
        start_timestamp : start,
        end_timestamp : end,
        equipment_address : equipment,
        monitored_person : target,
        is_normal : is_normal
        });
        measures.push( newMeasure );
    }
}