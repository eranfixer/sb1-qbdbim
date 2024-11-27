import React, { useState } from 'react';
import { Calendar, Clock, Users, Home, Coffee, Music, Waves, Phone, CheckCircle, XCircle, Plus, ListTodo } from 'lucide-react';

const Dashboard = () => {
  const [currentTime] = useState(new Date().toLocaleTimeString('he-IL'));
  const [currentDate] = useState(new Date().toLocaleDateString('he-IL'));
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [callbacks, setCallbacks] = useState([]);
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [roomsData, setRoomsData] = useState({
    'קומה ראשונה': [
      { number: 101, type: "ג'קוזי", status: "פנוי" },
      { number: 102, type: "ג'קוזי", status: "תפוס" },
      { number: 103, type: "ג'קוזי", status: "פנוי" },
      { number: 104, type: "ג'קוזי", status: "תפוס" },
      { number: 105, type: "ג'קוזי", status: "פנוי" },
      { number: 106, type: "בריכה", status: "תפוס" },
      { number: 107, type: "בריכה", status: "פנוי" },
      { number: 108, type: "בריכה", status: "פנוי" },
      { number: 109, type: "מרפסת", status: "תפוס" },
      { number: 110, type: "VIP", status: "פנוי" },
      { number: 111, type: "פרימיום נאו", status: "תפוס" },
    ],
    'קומה שנייה': [
      { number: 201, type: "סטנדרט", status: "פנוי" },
      { number: 202, type: "סטנדרט", status: "תפוס" },
      { number: 203, type: "סטנדרט", status: "פנוי" },
      { number: 204, type: "סטנדרט", status: "פנוי" },
      { number: 205, type: "פרימיום", status: "תפוס" },
      { number: 206, type: "סטנדרט", status: "פנוי" },
      { number: 207, type: "סטנדרט", status: "תפוס" },
      { number: 208, type: "סטנדרט", status: "פנוי" },
    ]
  });

  const toggleRoomStatus = (floor, roomNumber) => {
    setRoomsData(prevRooms => ({
      ...prevRooms,
      [floor]: prevRooms[floor].map(room => 
        room.number === roomNumber
          ? { ...room, status: room.status === "תפוס" ? "פנוי" : "תפוס" }
          : room
      )
    }));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addCallback = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCallback = {
      id: Date.now(),
      name: formData.get('name'),
      phone: formData.get('phone'),
      type: formData.get('type'),
      subject: formData.get('subject')
    };
    setCallbacks([...callbacks, newCallback]);
    setShowCallbackForm(false);
    e.target.reset();
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">מלון הוטל - לוח בקרה</h1>
            <div className="text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{currentDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{currentTime}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Coffee className="w-5 h-5" />
                <h3 className="font-semibold">ארוחת בוקר</h3>
              </div>
              <p>עד השעה 11:00</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-purple-700 mb-2">
                <Music className="w-5 h-5" />
                <h3 className="font-semibold">אירועים היום</h3>
              </div>
              <p>{new Date().getDay() === 4 ? 'ארוחת ערב עם די-ג\'יי' : new Date().getDay() === 5 ? 'די-ג\'יי בצהריים' : 'אין אירועים מיוחדים'}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <Waves className="w-5 h-5" />
                <h3 className="font-semibold">בריכות</h3>
              </div>
              <p>בריכת גג מחוממת פעילה</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {Object.entries(roomsData).map(([floor, roomsList]) => (
            <div key={floor} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">{floor}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {roomsList.map((room) => (
                  <div 
                    key={room.number}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      room.status === 'תפוס' ? 'bg-red-50 hover:bg-red-100' : 'bg-green-50 hover:bg-green-100'
                    }`}
                    onClick={() => toggleRoomStatus(floor, room.number)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">חדר {room.number}</span>
                      <span className={`px-2 py-1 rounded text-sm ${
                        room.status === 'תפוס' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {room.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{room.type}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <ListTodo className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">משימות</h2>
            </div>
            <form onSubmit={addTask} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="משימה חדשה..."
                className="flex-1 p-2 border rounded-lg"
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                הוסף
              </button>
            </form>
            <div className="space-y-2">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? 
                    <CheckCircle className="w-5 h-5 text-green-600" /> :
                    <XCircle className="w-5 h-5 text-gray-400" />
                  }
                  <span className={task.completed ? 'line-through text-gray-400' : ''}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Phone className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-800">לחזור ל...</h2>
              </div>
              <button
                onClick={() => setShowCallbackForm(!showCallbackForm)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            {showCallbackForm && (
              <form onSubmit={addCallback} className="mb-4 space-y-3">
                <input
                  name="name"
                  type="text"
                  placeholder="שם"
                  required
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="טלפון"
                  required
                  className="w-full p-2 border rounded-lg"
                />
                <select
                  name="type"
                  required
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">סוג לקוח</option>
                  <option value="existing">אורח קיים</option>
                  <option value="potential">מתעניין</option>
                </select>
                <input
                  name="subject"
                  type="text"
                  placeholder="נושא הפניה"
                  required
                  className="w-full p-2 border rounded-lg"
                />
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  שמור
                </button>
              </form>
            )}

            <div className="space-y-2">
              {callbacks.map(callback => (
                <div key={callback.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{callback.name}</h3>
                      <p className="text-sm text-gray-600">{callback.phone}</p>
                    </div>
                    <span className="text-sm px-2 py-1 bg-purple-100 text-purple-800 rounded">
                      {callback.type === 'existing' ? 'אורח קיים' : 'מתעניין'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{callback.subject}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;