import {Mesaj} from '../../main/core/domain/Mesaj';

describe('Mesaj', ()=>{
    test('should create a new message', ()=>{
      const senderId = 1213;
      const receiverId = [123];
      const content = "Mesaj Content";
      const isAnonymous = false;
      const time = 121313442;

      const mesaj = new Mesaj({
        senderId,
        receiverId,
        content,
        time,
        isAnonymous,
      });

      expect(mesaj.content).toMatch('Mesaj Content');
      expect(mesaj.isAnonymous).toBeFalsy();
      expect(mesaj.time).toEqual(121313442);
      expect(mesaj.senderId).toEqual(1213);
      expect(mesaj.receiverId).toEqual([123]);
    })
})
