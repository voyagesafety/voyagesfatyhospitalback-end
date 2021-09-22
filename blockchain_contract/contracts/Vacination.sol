// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Vacination {
    struct Person {
        string firstName;
        string lastName;
        string gender;
        string vaccineName1;
        string dateGetVaccine1;
        string hospitalName1;
        string vaccineName2;
        string dateGetVaccine2;
        string hospitalName2;
        address sender;
    }
    event AddedVaccine(
        uint256 citizenId,
        string vaccineName1,
        string dateGetVaccine1,
        string hospitalName1,
        string vaccineName2,
        string dateGetVaccine2,
        string hospitalName2,
        address sender
    );
    mapping(uint256 => Person) persons;

    function addVaccine(
        uint256 _citizenId,
        string memory _firstName,
        string memory _lastName,
        string memory _gender,
        string memory _vaccineName1,
        string memory _dateGetVaccine1,
        string memory _hospitalName1,
        string memory _vaccineName2,
        string memory _dateGetVaccine2,
        string memory _hospitalName2
    ) public {
        persons[_citizenId] = Person({
            firstName: _firstName,
            lastName: _lastName,
            gender: _gender,
            vaccineName1: _vaccineName1,
            dateGetVaccine1: _dateGetVaccine1,
            hospitalName1: _hospitalName1,
            vaccineName2: _vaccineName2,
            dateGetVaccine2: _dateGetVaccine2,
            hospitalName2: _hospitalName2,
            sender: msg.sender
        });
        emit AddedVaccine(
            _citizenId,
            _vaccineName1,
            _dateGetVaccine1,
            _hospitalName1,
            _vaccineName2,
            _dateGetVaccine2,
            _hospitalName2,
            msg.sender
        );
    }

    
    function getVaccine(uint256 _citizenId)
        public
        view
        returns (
            bool haveVaccine,
            uint256 countVaccine,
            string memory vaccineName1,
            string memory dateGetVaccine1,
            string memory hospitalName1,
            string memory vaccineName2,
            string memory dateGetVaccine2,
            string memory hospitalName2
        )
    {
        Person memory person = persons[_citizenId];
        if (bytes(person.dateGetVaccine1).length != 0) {
            if (bytes(person.dateGetVaccine2).length != 0) {
                return (
                    haveVaccine = true,
                    countVaccine = 2,
                    vaccineName1 = person.vaccineName1,
                    dateGetVaccine1 = person.dateGetVaccine1,
                    hospitalName1 = person.hospitalName1,
                    vaccineName2 = person.vaccineName2,
                    dateGetVaccine2 = person.dateGetVaccine2,
                    hospitalName2 = person.hospitalName2
                );
            } else {
                return (
                    haveVaccine = true,
                    countVaccine = 1,
                    vaccineName1 = person.vaccineName1,
                    dateGetVaccine1 = person.dateGetVaccine1,
                    hospitalName1 = person.hospitalName1,
                    vaccineName2 = person.vaccineName2,
                    dateGetVaccine2 = person.dateGetVaccine2,
                    hospitalName2 = person.hospitalName2
                );
            }
        } else {
            return (
                haveVaccine = false,
                countVaccine = 0,
                vaccineName1 = person.vaccineName1,
                dateGetVaccine1 = person.dateGetVaccine1,
                hospitalName1 = person.hospitalName1,
                vaccineName2 = person.vaccineName2,
                dateGetVaccine2 = person.dateGetVaccine2,
                hospitalName2 = person.hospitalName2
            );
        }
    }
}
